from rest_framework import viewsets , status
from rest_framework.response import Response
from rest_framework.decorators import action
from activos.apis.serializers.formulas_calculator_serializer import FormulasCalculatorSerializer
from database.models import Estadoxactivo,FormulasCalculator,Activo,Criticidad  


class FormulasCalculatorViewset(viewsets.ModelViewSet):
    queryset= FormulasCalculator.objects.all().order_by('id') # traer modelo y ordenarlo por id
    serializer_class= FormulasCalculatorSerializer  # trate serializer
    
    def validarValorCriticidad(self, activo):
        estado=activo.estadoxactivo
        if not estado:
            return
        
        #Obtener formula activa o por default
        formula_obj= FormulasCalculator.objects.filter(estado='activo').first()
        if not formula_obj:
            formula_obj= FormulasCalculator.objects.filter(default=True).first()
        if not formula_obj:
            print("No existe fórmula activa ni por defecto")
            return 
        if not formula_obj.formula:
            print("La fórmula está vacía")
            return
        
         # declarar variables de contexto con los valores de las tablas estado por activo
        contexto = {
                    'conf': estado.confidencialidad.valor if estado.confidencialidad and estado.confidencialidad.valor else 0,
                    'intg': estado.integridad.valor if estado.integridad and estado.integridad.valor else 0,
                    'disp': estado.disponibilidad.valor if estado.disponibilidad and estado.disponibilidad.valor else 0,}
        
        #evaluar la formula
        try:
            total_valor= eval(formula_obj.formula ,{}, contexto)
            
        except Exception as e:
            print(f"error al implementar formula: {e}")
            total_valor= sum(contexto.values()) # Fallback simple
            
        
        #asignar valor a activos
        
        activo.valor=total_valor   
        activo.save()
        
        
        
        #validar criticidad
        criticidad_id = 3 if total_valor <= 5 else 2 if total_valor <= 10 else 1
            
        #traer modelo de criticidad para validar
        try:
            criticidad_obj= Criticidad.objects.get(id=criticidad_id)
            estado.criticidad=criticidad_obj
            estado.save()
        except Criticidad.DoesNotExist:
             print(f"Criticidad con ID {criticidad_id} no encontrada")
        
    
    
    
    def destroy (self, request, *args, **kwargs):
        formula =self.get_object()
        if formula.default:
            return Response({'error': 'Cannot delete the default formula'}, status=status.HTTP_403_FORBIDDEN)

        else:
            self.perform_destroy(formula)
            return Response({'Response': 'Successfully deleted formula'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], url_path='activar')
    def activar(self, request, pk=None):
        FormulasCalculator.objects.update(estado='inactivo')
        formula=self.get_object()
        formula.estado='activo'
        formula.save()
        
         #invocar funcion  de calcular valor (validarValorCriticidad)y Recalcular todos los activos  
        for activo in Activo.objects.all():
            self.validarValorCriticidad(activo)
        
        return Response ({'Response': 'Successfully activated formula'}, status=status.HTTP_200_OK)
    
    
    @action(detail=False, methods=['get'], url_path='listar')
    def listar(self,request):
        formulas=FormulasCalculator.objects.all()
        serializer=self.get_serializer(formulas, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
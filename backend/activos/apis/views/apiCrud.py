from rest_framework import viewsets # genera endpoints  #DRF =django rest framework
from rest_framework.response import Response  # Respuestas Http
from rest_framework import status # estados HTTP (201,401,400,etc..)
from database.models import Activo,Criticidad  # Importar el modelo de Activos que esta en la app database del proyecto
from database.models import Estadoxactivo,FormulasCalculator
from activos.apis.serializers import ActivoSerializer # importar serializer de Activos
from activos.apis.serializers import EstadoxactivoSerializer


class ActivoViewSet(viewsets.ModelViewSet):
    queryset= Activo.objects.all().order_by('id')    #modelo
    serializer_class =ActivoSerializer # serializer
    

    
    def validarValorCriticidad(self, activo):
        estado = activo.estadoxactivo
        total_valor = 0
        
        if estado:
            #validar si un registro esta en activo
            formula_obj=FormulasCalculator.objects.filter(estado='activo').first()
            #si no hay alguno activo se agrega activo el registro x default
            if not formula_obj:
                formula_obj=FormulasCalculator.objects.filter(default=True).first()
    
        
        # declarar variables de contexto
          
            contexto = {
                    'conf': estado.confidencialidad.valor if estado.confidencialidad and estado.confidencialidad.valor else 0,
                    'intg': estado.integridad.valor if estado.integridad and estado.integridad.valor else 0,
                    'disp': estado.disponibilidad.valor if estado.disponibilidad and estado.disponibilidad.valor else 0,
}

                
            #Relizar la operación con la formula seleccionada
            try:
                total_valor= eval(formula_obj.formula, {},contexto)
            except Exception as e:
                print(f"Error evaluando fórmula: {e}")
                total_valor = contexto['conf'] + contexto['intg'] + contexto['disp']  # fallback manual
                return Response (f"Error: {e}" , status=status.HTTP_400_BAD_REQUEST )
 
        
        #Guardarlo en el campo valor-------------
        activo.valor = total_valor
        activo.save()
        #print(f"Valor calculado para el activo: {total_valor}")
        
        
        
        criticidad_id=  None
        if total_valor <=5: 
            criticidad_id=3 #"Baja"
        elif total_valor <=10:
            criticidad_id=2 #"Media"
        else:
            criticidad_id=1 # "Alta"
        
        try:
            criticidad_obj= Criticidad.objects.get(id=criticidad_id)
            estado.criticidad=criticidad_obj
            estado.save()
        except Criticidad.DoesNotExist:
            pass  # Si no existe, ignoramos el error para no romper la visualización
            #Response({"error": "error al validar criticidad"}, status=status.HTTP_400_BAD_REQUEST)
        
    
    def list(self, request, *args, **kwargs):
    # Recalcular todos los activos antes de listar
      for activo in self.queryset:
         self.validarValorCriticidad(activo)
      return super().list(request, *args, **kwargs)
    
    def retrieve(self, request, *args, **kwargs):
    # Recalcular un solo activo antes de mostrarlo
     activo = self.get_object()
     self.validarValorCriticidad(activo)
     return super().retrieve(request, *args, **kwargs)
    
    
    
    
    
    #CREAR ACTIVO - metodo POST
    def create(self, request):  
        estadoxactivo_data= request.data.get("estadoxactivo")
        estadoxactivo_serializer = EstadoxactivoSerializer(data=estadoxactivo_data)
        if estadoxactivo_serializer.is_valid():
            estado= estadoxactivo_serializer.save()
            
            #copia del request y agregar el id
            activo_data= request.data.copy()
            activo_data["estadoxactivo"]=estado.id
            
            #usar ActivoSerializer
            
            activo_serializer= self.get_serializer(data=activo_data)
            if activo_serializer.is_valid():
                activo_serializer.save()
                self.validarValorCriticidad(activo_serializer.instance)
                
                return Response({"message": "El Activo se agrego exitosamente."}, status=status.HTTP_201_CREATED)
            else: 
                estado.delete() #si falla eliminamos el estadoxactivo
                return Response({
                "message": "Error al agregar activo.",
                "errors": activo_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        else:    
             return Response({
            "message": "Error al agregar activo.",
            "errors": estadoxactivo_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
             
             
    #ACTUALIZAR ACTIVO- Metodo PUT
    def update(self, request, pk=None , *args, **kwargs):   #pk recibe el id del objeto y *args, **kwargs  recibe argumentos adicionales de DRF evita errores en el futuro
        try:
            activo= self.get_object()
            estadoxactivo_data= request.data.get("estadoxactivo")
            #actualizar estadoxactivo
            if estadoxactivo_data:
                #obtener informacion
                estado_obj= activo.estadoxactivo #obtener el estado ya relacionado en activo
                estadoxactivo_serializer= EstadoxactivoSerializer(estado_obj, data=estadoxactivo_data)
                
                #validacion
                if estadoxactivo_serializer.is_valid():
                    estadoxactivo_serializer.save()
                    
                else: 
                    return Response({"message":"Error al actualizar activo.", 
                                     "error": estadoxactivo_serializer.errors  },
                                    status=status.HTTP_400_BAD_REQUEST)
                
                
            # Actualizar activo
             #copia del request y agregar el id de la tabla estadoxactivo
            activo_data= request.data.copy()
            activo_data["estadoxactivo"]=activo.estadoxactivo.id  # traer el id de la tabla estadoxactivo
            activo_serializer= self.get_serializer(activo, data=activo_data)
            
            
            if activo_serializer.is_valid():
                activo_serializer.save()
                self.validarValorCriticidad(activo_serializer.instance)
                return Response({"message":"El activo se ha actualizado correctamente"}, status=status.HTTP_200_OK)
            else:
                return Response({"message":"Error al actualizar activo.",
                                 "error":activo_serializer.errors}, 
                                status=status.HTTP_400_BAD_REQUEST)
        except Activo.DoesNotExist:
            return Response({"message": "El activo no fue encontrado."}, status=status.HTTP_404_NOT_FOUND)

    
      
    #ELIMINAR ACTIVO   
    def destroy(self, request, pk=None, *args, **kwargs) :  #pk recibe el id del objeto
        try:
            activo=self.get_object()
            activo.delete()
            return Response({"message":"Activo eliminado con éxito."}, status=status.HTTP_200_OK)
        except Activo.DoesNotExist:
            return Response({"message":"El activo no fue encontrado."},status=status.HTTP_404_NOT_FOUND)
from rest_framework import viewsets , status
from rest_framework.response import Response
from rest_framework.decorators import action
from activos.apis.serializers.formulas_calculator_serializer import FormulasCalculatorSerializer
from database.models.formulasCalculator import FormulasCalculator

class FormulasCalculatorViewset(viewsets.ModelViewSet):
    queryset= FormulasCalculator.objects.all().order_by('id') # traer modelo y ordenarlo por id
    serializer_class= FormulasCalculatorSerializer  # trate serializer
    
    def destroy (self, request, *args, **kwards):
        formula =self.get_object()
        if formula.default:
            return Response({'Error:' 'Cannot delete the default formula'}, status=status.HTTP_403_FORBIDDEN)
        else:
            super().destroy(request, *args, **kwards)
            return Response({'Response': 'Successfully deleted formula'}, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'], url_path='activar')
    def activar(self, request, pk=None):
        FormulasCalculator.objects.update(estado='inactivo')
        formula=self.get_object()
        formula.estado='activo'
        formula.save()
        return Response ({'Response': 'Successfully activated formula'}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], url_path='listar')
    def listar(self,request):
        formulas=FormulasCalculator.objects.all()
        serializer=self.get_serializer(formulas, many=True)
        return Response(serializer.data , status=status.HTTP_200_OK)
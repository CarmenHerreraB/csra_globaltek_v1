from rest_framework import viewsets,status
from rest_framework.response import Response
from database.models import DatospersonaleActivo
from activos.apis.serializers import DatospersonalesActivoSerializer

class DatospersonalesActivoViewset(viewsets.ModelViewSet):
    queryset = DatospersonaleActivo.objects.all()
    serializer_class = DatospersonalesActivoSerializer
    
class DatospersonalesActivoCustomViewset(viewsets.ModelViewSet):
    queryset=DatospersonaleActivo.objects.all().order_by('id')
    serializer_class= DatospersonalesActivoSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance= self.get_object()
        if instance.is_default:
            instance.estado='inactivo'
            instance.save()
            return Response({'detail':'Registro por defecto inactivado, no eliminado.'}, status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail': 'Registro eliminado correctamente'},status=status.HTTP_200_OK)
    
from rest_framework import viewsets, status
from database.models import Proceso
from activos.apis.serializers import ProcesoSerializer
from rest_framework.response import Response


class ProcesoViewset(viewsets.ModelViewSet):
    queryset=Proceso.objects.all()
    serializer_class= ProcesoSerializer

class ProcesoCustomViewset(viewsets.ModelViewSet):
    queryset=Proceso.objects.all().order_by('id')
    serializer_class=ProcesoSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance= self.get_object()
        if instance.is_default:
            instance.estado='inactivo'
            instance.save()
            return Response({'detail': 'Registro por defecto inactivado, no eliminado.'},status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail': 'Registro eliminado correctamente'}, status=status.HTTP_200_OK)
        
        
        
    
from rest_framework import viewsets,status
from rest_framework.response import Response
from database.models import Tipodeactivo
from activos.apis.serializers import TipodeactivoSerializer
from rest_framework import serializers


class TipodeactivoViewset(viewsets.ModelViewSet):
    queryset=Tipodeactivo.objects.all()
    serializer_class= TipodeactivoSerializer
    
class TipodeactivoCustomViewset(viewsets.ModelViewSet):
    queryset = Tipodeactivo.objects.all()
    serializer_class = TipodeactivoSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_default:
            instance.estado = 'inactivo'
            instance.save()
            return Response({'detail': 'Registro por defecto inactivado, no eliminado.'}, status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail': 'Registro eliminado correctamente.'}, status=status.HTTP_204_NO_CONTENT)
    
   
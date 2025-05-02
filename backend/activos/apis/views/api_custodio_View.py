from rest_framework import viewsets, status
from rest_framework.response import Response
from database.models import Custodio
from activos.apis.serializers import CustodioSerializer



class CustodioViewset(viewsets.ModelViewSet):
    queryset =Custodio.objects.all().order_by('id')
    serializer_class = CustodioSerializer

class CustodioCustomViewset(viewsets.ModelViewSet):
    queryset= Custodio.objects.all().order_by('id')
    serializer_class= CustodioSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance= self.get_object()
        if instance.is_default:
            instance.estado ='inactivo'
            instance.save()
            return Response({'detail':'Registro por defecto inactivado, no eliminado.'},status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail':'Registro eliminado correctamente'},status=status.HTTP_200_OK)
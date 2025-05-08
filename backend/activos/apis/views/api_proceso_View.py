from rest_framework import viewsets, status
from database.models import Proceso
from activos.apis.serializers import ProcesoSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction


class ProcesoViewset(viewsets.ModelViewSet):
    #queryset=Proceso.objects.all()
    serializer_class= ProcesoSerializer
    def get_queryset(self):
        return Proceso.objects.filter(estado='activo').order_by('id')
    

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
        
    @action(detail=False, methods=['post'], url_path='by_default')
    def default(self, request, *args,**kwargs):
        
        with transaction.atomic():  # transacción atómica,se ejecuta completamente o no se ejecuta nada si hay algun error no realiza nada
            register_by_default=Proceso.objects.filter(is_default=True)
            Proceso.objects.exclude(is_default=True).delete()
            
            #recargar todos los registros por defecto
            for default in register_by_default:
                default.estado ='activo'
                default.save()
        return Response(
            {"mensaje": "Registros restablecidos a valores por defecto correctamente."},
            status=status.HTTP_200_OK
        )
    
      
        
    
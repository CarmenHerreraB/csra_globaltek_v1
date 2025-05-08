from rest_framework import viewsets,status
from rest_framework.response import Response
from database.models import DatospersonaleActivo
from activos.apis.serializers import DatospersonalesActivoSerializer
from rest_framework.decorators import action
from django.db import transaction

class DatospersonalesActivoViewset(viewsets.ModelViewSet):
    #queryset = DatospersonaleActivo.objects.all()
    serializer_class = DatospersonalesActivoSerializer
    
    def get_queryset(self):
        queryset=DatospersonaleActivo.objects.filter(estado='activo').order_by()
        return queryset
    
    
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
    @action(detail=False, methods=['post'], url_path='by_default')
    def default(self, request, *args,**kwargs):
        
        with transaction.atomic():  # transacción atómica,se ejecuta completamente o no se ejecuta nada si hay algun error no realiza nada
            register_by_default=DatospersonaleActivo.objects.filter(is_default=True)
            DatospersonaleActivo.objects.exclude(is_default=True).delete()
            
            #recargar todos los registros por defecto
            for default in register_by_default:
                default.estado ='activo'
                default.save()
        return Response(
            {"mensaje": "Registros restablecidos a valores por defecto correctamente."},
            status=status.HTTP_200_OK
        )
from rest_framework import viewsets,status
from database.models import Confidencialidad
from activos.apis.serializers import ConfidencialidadSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction



class ConfidencialidadViewSet(viewsets.ModelViewSet):
    queryset = Confidencialidad.objects.all().order_by('id')
    serializer_class =ConfidencialidadSerializer
    

class ConfidencialidadCustomViewSet(viewsets.ModelViewSet):
    queryset = Confidencialidad.objects.all().order_by('id')
    serializer_class = ConfidencialidadSerializer
    
            
    def create(self, request, *args, **kwargs):
        serializer=self.get_serializer(data=request.data)
        if serializer.is_valid():
            instance=serializer.save()
            return Response(self.get_serializer(instance).data, status=status.HTTP_201_CREATED)
        else: 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()  # Traigo el objeto - modelo
        data = request.data   # Registros del modelo
        
        if instance.is_default:
            # Actualización del valor
            nuevo_valor = data.get('valor')
            if nuevo_valor is not None:
                try:
                    nuevo_valor = int(nuevo_valor)
                    if nuevo_valor != instance.valor:
                        instance.valorActualizado = nuevo_valor
                    else:
                        instance.valorActualizado = None
                except ValueError:
                    return Response({'error': 'Valor inválido para "valor"'}, status=400)
            
            # Actualización del color
            nuevo_color = data.get('color')
            if nuevo_color is not None:
                # Si 'color' es un campo de texto, no es necesario convertirlo a int.
                if nuevo_color != instance.color:
                    instance.colorActualizado = nuevo_color
                else:
                    instance.colorActualizado = None
        else:
            # Si no es el valor por defecto, actualizamos directamente
            instance.valor = data.get('valor', instance.valor)
            instance.color = data.get('color', instance.color)
        
        # Actualización del estado
        instance.estado = data.get('estado', instance.estado)
        instance.save()
        
        return Response(self.get_serializer(instance).data)
    
    def destroy(self, request, *args, **kwargs):
        instance= self.get_object()
        if instance.is_default:
            instance.estadoCriterio='inactivo'
            instance.save()
            return Response({'detail':'Registro por defecto inactivado, no eliminado.'}, status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail': 'Registro eliminado correctamente'},status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], url_path='by_default')
    def default(self, request, *args,**kwargs):
        
        with transaction.atomic():  # transacción atómica,se ejecuta completamente o no se ejecuta nada si hay algun error no realiza nada
            register_by_default=Confidencialidad.objects.filter(is_default=True)
            Confidencialidad.objects.exclude(is_default=True).delete()
            
            #recargar todos los registros por defecto
            for default in register_by_default:
                default.estadoCriterio ='activo'
                default.valorActualizado= None
                default.colorActualizado= None
                default.save()
        return Response(
            {"mensaje": "Registros restablecidos a valores por defecto correctamente."},
            status=status.HTTP_200_OK
        )
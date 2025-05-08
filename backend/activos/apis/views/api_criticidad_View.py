from rest_framework import viewsets,status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db import transaction
from database.models import Criticidad
from activos.apis.serializers import CriticidadSerializer

class criticidadViewSet(viewsets.ModelViewSet):
    queryset=Criticidad.objects.all()
    serializer_class= CriticidadSerializer

class criticidadCustomViewSet(viewsets.ModelViewSet):
    queryset=Criticidad.objects.all().order_by('id')
    serializer_class=CriticidadSerializer
    
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
        
        #validacion de valores por defecto
        if instance.is_default:
            # Actualización del valor
            nuevo_valor_min = data.get('valor_min')
            nuevo_valor_max= data.get('valor_max')
            
            if nuevo_valor_min is not None:
                try:
                    if nuevo_valor_min != instance.valor_min:
                        instance.valor_minActualizado = int(nuevo_valor_min)
                    else:
                        instance.valor_minActualizado = None
                except ValueError:
                    return Response({'error': 'Valor inválido para "valor"'}, status=400)
                
            if nuevo_valor_max is not None:
                try:
                    if nuevo_valor_max != instance.valor_max:
                        instance.valor_maxActualizado = int(nuevo_valor_max)
                    else:
                        instance.valor_maxActualizado = None
                except ValueError:
                    return Response({'error': 'Valor inválido para "valor"'}, status=400)
                
            # Actualización del color
            nuevo_color = data.get('color')
            if nuevo_color is not None:
                # Si 'color' es un campo de texto, no es necesario convertirlo a int.
                try:
                  if nuevo_color != instance.color:
                      instance.colorActualizado = nuevo_color
                  else:
                      instance.colorActualizado = None
                except ValueError:
                    return Response({'error': 'Valor inválido para "color"'}, status=400)
        else:
            # Si no es el valor por defecto, actualizamos directamente
            instance.valor_min = data.get('valor_min')
            instance.valor_max = data.get('valor_max')
            instance.color = data.get('color')
        
        # Actualización del estado
        instance.estado = data.get('estado', instance.estado)
        instance.save()
        
        return Response(self.get_serializer(instance).data, status=status.HTTP_200_OK)
    
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
            register_by_default=Criticidad.objects.filter(is_default=True)
            Criticidad.objects.exclude(is_default=True).delete()
            
            #recargar todos los registros por defecto
            for default in register_by_default:
                default.estadoCriterio ='activo'
                default.valor_minActualizado= None
                default.valor_maxActualizado= None
                default.colorActualizado= None
                default.save()
        return Response(
            {"mensaje": "Registros restablecidos a valores por defecto correctamente."},
            status=status.HTTP_200_OK
        )

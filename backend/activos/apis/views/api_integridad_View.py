from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from django.db import transaction
from database.models import Integridad
from activos.apis.serializers import IntegridadSerializer


class IntegridadViewSet(viewsets.ModelViewSet):
    queryset=Integridad.objects.all().order_by('id')
    serializer_class= IntegridadSerializer


class IntegridadCustomViewSet(viewsets.ModelViewSet):
    queryset= Integridad.objects.all().order_by('id')
    serializer_class=IntegridadSerializer
    
    def create(self, request, *args, **kwargs):
        serializer= self.get_serializer(data=request.data) #request
        if serializer.is_valid():
            instance=serializer.save()
            return Response(self.get_serializer(instance).data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
        
    def update(self, request, *args, **kwargs):
        instance= self.get_object() #Traigo el objeto-modelo
        data= request.data #registros del modelo
        
        #actualizar  registros con campo por defecto
        if instance.is_default:
             #actualizar valor 
            nuevo_valor= data.get('valor')
            if nuevo_valor is not None:
                try:
                    #nuevo_valor= int(nuevo_valor)
                    if nuevo_valor!=instance.valor:
                        instance.valorActualizado= int(nuevo_valor)
                    else:
                        instance.valorActualizado= None
                except ValueError:
                    return Response({'error': 'Valor inválido para "valor"'},status=400)
                
        #actualizar color
            nuevo_color=data.get('color')
            if nuevo_color is not None:
                try:
                    if nuevo_color != instance.color:
                     instance.colorActualizado=nuevo_color
                    else: 
                     instance.colorActualizado= None
                except ValueError:
                    return Response({'error': 'Valor inválido para "valor"'},status=400)
        else:
            # Si no es el valor por defecto, actualizamos directamente
            instance.valor= data.get('valor')
            instance.color= data.get('color')
          
      
          # Actualización del estado
        instance.estado = data.get('estado', instance.estado)
        instance.save()
        
        return Response (self.get_serializer(instance).data)
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.is_default:
            instance.estadoCriterio ='inactivo'
            instance.save()
            return Response ({'detail':'Registro por defecto inactivado, no eliminado.'}, status=status.HTTP_200_OK)
        else:
            self.perform_destroy(instance)
            return Response({'detail': 'Registro eliminado correctamente'},status=status.HTTP_200_OK)

    @action(detail=False,methods=['post'], url_path='by_default') 
    def default(self, request, *args,**kwargs ): 
        
        with transaction.atomic():
            register_by_default=Integridad.objects.filter(is_default=True)
            Integridad.objects.exclude(is_default=True).delete()
            
            #recargar todos los registros
            for default in register_by_default:
                default.estadoCriterio = 'activo'
                default.valorActualizado= None
                default.colorActualizado= None
                default.save()
        return Response(
            {"mensaje": "Registros restablecidos a valores por defecto correctamente."},
            status=status.HTTP_200_OK
        )
                
            
                    
      

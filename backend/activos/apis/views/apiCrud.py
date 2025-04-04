from rest_framework import viewsets # genera endpoints  #DRF =django rest framework
from rest_framework.response import Response  # Respuestas Http
from rest_framework import status # estados HTTP (201,401,400,etc..)
from database.models import Activo  # Importar el smodelo de Activos que esta en la app database del proyecto
from activos.apis.serializers import ActivoSerializer # importar serializer de Activos

class ActivoViewSet(viewsets.ModelViewSet):
    queryset= Activo.objects.all()     #modelo
    serializer_class =ActivoSerializer # serializer
    
    #CREAR ACTIVO
    def create(self, request):  
        serializer= self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "El Activo se agrego exitosamente."}, status=status.HTTP_201_CREATED)
        return Response({"message":"Error al agregar activo."}, status=status.HTTP_400_BAD_REQUEST)
    
    #ACTUALIZAR ACTIVO
    def update(self, request, pk=None , *args, **kwargs):   #pk recibe el id del objeto y *args, **kwargs  recibe argumentos adicionales de DRF evita errores en el futuro
        try:
            activo= self.get_object()
            serializer= self.get_serializer(activo, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({"message":"El activo se ha actualizado correctamente"}, status=status.HTTP_200_OK)
            return Response({"message":"Error al actualizar activo."}, status=status.HTTP_400_BAD_REQUEST)
        except Activo.DoesNotExist:
            return Response({"message": "El activo no fue encontrado."}, status=status.HTTP_404_NOT_FOUND)
         
    #ELIMINAR ACTIVO   
    def destroy(self, request, pk=None, *args, **kwargs) :  #pk recibe el id del objeto
        try:
            activo=self.get_object()
            activo.delete()
            return Response({"message":"Activo eliminado con éxito."}, status=status.HTTP_200_OK)
        except Activo.DoesNotExist:
            return Response({"message":"El activo no fue encontrado."},status=status.HTTP_404_NOT_FOUND)
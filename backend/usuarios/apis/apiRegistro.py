from rest_framework import viewsets  # importante para generar los endpoints automaticamente - Necesario para usar ModelViewSet
from rest_framework.response import Response  #Necesario para devolver respuestas HTTP personalizadas.
from rest_framework import status #Necesario para devolver códigos de estado HTTP (201, 400, 404, etc.).
from database.models import Usuario # Necesario para consultar el modelo Student.
from .serializers import UsuarioSerializer # se trae el serializer #  Necesario para convertir los datos de Python a JSON y viceversa.


class RegistroUsuarioApi(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    
    serializer_class = UsuarioSerializer
    
    def create(self,request):
        serializer = UsuarioSerializer(data=request.data)
       # serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status= status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
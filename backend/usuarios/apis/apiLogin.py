from rest_framework import viewsets  # importante para generar los endpoints automaticamente - Necesario para usar ModelViewSet
from rest_framework.response import Response  #Necesario para devolver respuestas HTTP personalizadas.
from rest_framework import status #Necesario para devolver códigos de estado HTTP (201, 400, 404, etc.).
from database.models import Usuario # Trae el modelo de Usuario de la app database del proyecto
from .serializers import UsuarioSerializer # se trae el serializer #  Necesario para convertir los datos de Python a JSON y viceversa.
from rest_framework.views import APIView  # para las APIS
from rest_framework.exceptions import AuthenticationFailed  # pra realizar validaciones 
import jwt, datetime  #jason web token-  para los tokens
from django.conf import settings

SECRET_KEY = settings.SECRET_KEY

class LoginUsuarioApi(APIView):
    def post (self,request):
        correo= request.data['correo']
        password = request.data ['password']
        
        #validar que ingrese correo y contraseña
        if not correo or not password:
            raise AuthenticationFailed('Correo y contraseña son obligatorios')
        
        usuario = Usuario.objects.filter(correo=correo).first() # se filtra si el usuario existe verificando desde el correo
        
        if usuario is None:
            raise AuthenticationFailed('Usuario no encontrado') #Validación de correo correcto
        
        if not usuario.check_password(password):
             raise AuthenticationFailed ('Contraseña incorrecta') #Validación de contraseña correcta
         
        payload ={
             'id': usuario.id,
             'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
             'iat': datetime.datetime.utcnow()
         }
         
        #crear token JWT
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')  #se guarda el token
        
        response= Response()
        
        #guardar token en una cookie
        response.set_cookie(key='jwt', value=token, httponly=True, samesite='Lax') #samesite='Lax'- seguridad de las cookies # REVISAR LUEGO EL HTTPS
        
        response.data={'message': 'Login exitoso'}
        return response
    
    
class IngresoUsuarioApi (APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
      
        if not token:
            raise AuthenticationFailed('no autenticado')
        try:
            payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('no autenticado')
        usuario = Usuario.objects.filter(id=payload['id']).first()
        serializer = UsuarioSerializer(usuario)
        
        return Response(serializer.data)


class LogoutUsuarioApi(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt') 
        response.data = {
            'message': 'success logout'
        }
        return response

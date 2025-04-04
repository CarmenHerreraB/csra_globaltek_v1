from django.contrib import admin
from django.urls import path,include
from rest_framework.routers import DefaultRouter #router para registrar las rutas automáticamente
from usuarios.apis.views.apiRegistro_view import RegistroUsuarioApi
from usuarios.apis.views.apiLogin_view import LoginUsuarioApi, LogoutUsuarioApi,IngresoUsuarioApi
from usuarios.apis.views import TipoDocumentoViewSet, RolxPermisoViewSet



# 1. Crear el router
router =DefaultRouter()

# 2. Registrar el ViewSet en el router
router.register (r'usuarios', RegistroUsuarioApi, basename='usuarios') #CLASE DESDE EL ARCIVO VIEWS  con viewsets-  - Y CRUD - GET, POST ,PUT , PATCH, DELETE
router.register(r'tipo-documento', TipoDocumentoViewSet, basename='tipo-documento')
router.register(r'rolxpermiso', RolxPermisoViewSet, basename='rolxpermiso')

urlpatterns = [
    path('', include(router.urls)),    # <-- Aquí registras las rutas  (GET -POST ) 
    path('login/', LoginUsuarioApi.as_view()),
    path('perfil/',IngresoUsuarioApi.as_view()),
    path('logout/',LogoutUsuarioApi.as_view()),
  
]




# Endpoint de registro de Usuarios
#GET → http://localhost:8000/api/usuarios/ → Listar todos los clientes
#POST → http://localhost:8000/api/usuarios/ → Crear un cliente
#PUT → http://localhost:8000/api/usuarios/1/ → Actualizar un cliente    
#DELETE → http://localhost:8000/api/usuarios/1/ → Eliminar un cliente


#http://localhost:8000/api/login/  → Endpoint de Api login
#http://localhost:8000/api/perfil/ → Endpoint de Api perfil 
#http://localhost:8000/api/logout/ → Endpoint de Api logout
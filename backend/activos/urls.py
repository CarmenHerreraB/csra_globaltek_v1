from django.urls import path,include
from rest_framework.routers import DefaultRouter # crear las rutas del crud
from .apis.views.apiCrud import ActivoViewSet
from .apis.views import ConfidencialidadViewSet,criticidadViewSet,IntegridadViewSet,DisponibilidadViewSet
# 1. Crear el router
router= DefaultRouter()
# 2. Registrar el ViewSet en el router
router.register(r'activo', ActivoViewSet,basename='activo')
router.register(r'confidencialidad', ConfidencialidadViewSet,basename='confidencialidad')
router.register(r'criticidad', criticidadViewSet,basename='criticidad')
router.register(r'integridad', IntegridadViewSet,basename='integridad')
router.register(r'disponibilidad', DisponibilidadViewSet,basename='disponibilidad')


urlpatterns = [
    path('',include(router.urls) )   #enrrutamiento
]

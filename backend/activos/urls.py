from django.urls import path,include
from rest_framework.routers import DefaultRouter # crear las rutas del crud
from .apis.apiCrud import ActivoViewSet

# 1. Crear el router
router= DefaultRouter()
# 2. Registrar el ViewSet en el router
router.register(r'activo', ActivoViewSet)

urlpatterns = [
    path('',include(router.urls) )   #enrrutamiento
]

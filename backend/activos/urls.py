from django.urls import path,include
from rest_framework.routers import DefaultRouter # crear las rutas del crud
from .apis.views.apiCrud import ActivoViewSet
from .apis.views import ConfidencialidadViewSet,criticidadViewSet,IntegridadViewSet,DisponibilidadViewSet,CustodioViewset,DatospersonalesActivoViewset,TipodeactivoViewset,ProcesoViewset,DuenodeactivoViewset
# 1. Crear el router
router= DefaultRouter()
# 2. Registrar el ViewSet en el router
router.register(r'activo', ActivoViewSet,basename='activo')
router.register(r'confidencialidad', ConfidencialidadViewSet,basename='confidencialidad')
router.register(r'criticidad', criticidadViewSet,basename='criticidad')
router.register(r'integridad', IntegridadViewSet,basename='integridad')
router.register(r'disponibilidad', DisponibilidadViewSet,basename='disponibilidad')
router.register(r'custodio', CustodioViewset,basename='custodio')
router.register(r'datospersonales', DatospersonalesActivoViewset,basename='datospersonales')
router.register(r'tipodeactivo', TipodeactivoViewset,basename='tipodeactivo')
router.register(r'proceso', ProcesoViewset ,basename='proceso')
router.register(r'duenodeactivo', DuenodeactivoViewset,basename='duenodeactivo')


urlpatterns = [
    path('',include(router.urls) )   #enrrutamiento
]

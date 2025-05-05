from django.urls import path,include
from rest_framework.routers import DefaultRouter # crear las rutas del crud
from .apis.views.apiCrud import ActivoViewSet
from .apis.views import ConfidencialidadViewSet,criticidadViewSet,IntegridadViewSet,DisponibilidadViewSet,CustodioViewset,DatospersonalesActivoViewset,TipodeactivoViewset,ProcesoViewset,DuenodeactivoViewset,EstadoxactivoViewset
from .apis.views import ShowActivoValuesView, ListAllActivosValuesView, CalculatorView,FormulasCalculatorViewset
from .apis.views import TipodeactivoCustomViewset, ProcesoCustomViewset, CustodioCustomViewset,DatospersonalesActivoCustomViewset,DuenodeactivoCustomViewset
from .apis.views import ConfidencialidadCustomViewSet
# 1. Crear el router
router= DefaultRouter()
# 2. Registrar el ViewSet en el router
router.register(r'activo', ActivoViewSet,basename='activo')
router.register(r'confidencialidad', ConfidencialidadViewSet,basename='confidencialidad')
router.register(r'confidencialidadCustom',ConfidencialidadCustomViewSet, basename='confidencialidadCustom')
router.register(r'criticidad', criticidadViewSet,basename='criticidad')
router.register(r'integridad', IntegridadViewSet,basename='integridad')
router.register(r'disponibilidad', DisponibilidadViewSet,basename='disponibilidad')
router.register(r'custodio', CustodioViewset,basename='custodio')
router.register(r'custodioCustom',CustodioCustomViewset, basename='custodioCustom')
router.register(r'datospersonales', DatospersonalesActivoViewset,basename='datospersonales')
router.register(r'datospersonalesCustom',DatospersonalesActivoCustomViewset,basename='datospersonalesCustom')
router.register(r'tipodeactivo', TipodeactivoViewset,basename='tipodeactivo')
router.register(r'tipodeactivoCustom', TipodeactivoCustomViewset,basename='tipodeactivoCustom')
router.register(r'proceso', ProcesoViewset ,basename='proceso')
router.register(r'procesoCustom',ProcesoCustomViewset, basename='procesoCustom')
router.register(r'duenodeactivo', DuenodeactivoViewset,basename='duenodeactivo')
router.register(r'duenodeactivoCustom', DuenodeactivoCustomViewset,basename='duenodeactivoCustom')
router.register(r'Estadoxactivo', EstadoxactivoViewset, basename='Estadoxactivo')
router.register(r'formulas',FormulasCalculatorViewset, basename='formulas')


urlpatterns = [
    path('',include(router.urls) ),   #enrrutamiento
    path('ActivoValues/<int:id>/', ShowActivoValuesView.as_view(), name='activo-values'),
    path('allActivosValues/', ListAllActivosValuesView.as_view(), name='allActivos-values'),
    path('calculator/',CalculatorView.as_view(), name='calculator')
]

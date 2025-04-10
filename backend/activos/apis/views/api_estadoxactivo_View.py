from rest_framework import viewsets
from database.models import Estadoxactivo
from activos.apis.serializers import EstadoxactivoSerializer

class EstadoxactivoViewset(viewsets.ModelViewSet):
    queryset= Estadoxactivo.objects.all()
    serializer_class = EstadoxactivoSerializer
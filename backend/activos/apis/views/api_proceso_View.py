from rest_framework import viewsets
from database.models import Proceso
from activos.apis.serializers import ProcesoSerializer

class ProcesoViewset(viewsets.ModelViewSet):
    queryset=Proceso.objects.all()
    serializer_class= ProcesoSerializer
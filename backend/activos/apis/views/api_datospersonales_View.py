from rest_framework import viewsets
from database.models import DatospersonaleActivo
from activos.apis.serializers import DatospersonalesActivoSerializer

class DatospersonalesActivoViewset(viewsets.ModelViewSet):
    queryset = DatospersonaleActivo.objects.all()
    serializer_class = DatospersonalesActivoSerializer
    
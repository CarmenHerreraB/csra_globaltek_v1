from rest_framework import viewsets
from database.models import Duenodeactivo
from activos.apis.serializers import DuenodeactivoSerializer

class DuenodeactivoViewset(viewsets.ModelViewSet):
    queryset= Duenodeactivo.objects.all()
    serializer_class = DuenodeactivoSerializer
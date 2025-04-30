from rest_framework import viewsets
from database.models import Disponibilidad
from activos.apis.serializers import DisponibilidadSerializer


class DisponibilidadViewSet(viewsets.ModelViewSet):
    queryset=Disponibilidad.objects.all().order_by('id')
    serializer_class= DisponibilidadSerializer
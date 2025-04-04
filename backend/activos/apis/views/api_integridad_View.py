from rest_framework import viewsets
from database.models import Integridad
from activos.apis.serializers import IntegridadSerializer


class IntegridadViewSet(viewsets.ModelViewSet):
    queryset=Integridad.objects.all()
    serializer_class= IntegridadSerializer
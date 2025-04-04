from rest_framework import viewsets
from database.models import Criticidad
from activos.apis.serializers import CriticidadSerializer

class criticidadViewSet(viewsets.ModelViewSet):
    queryset=Criticidad.objects.all()
    serializer_class= CriticidadSerializer

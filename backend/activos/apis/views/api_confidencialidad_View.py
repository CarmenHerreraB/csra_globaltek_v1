from rest_framework import viewsets
from database.models import Confidencialidad
from activos.apis.serializers import ConfidencialidadSerializer
from rest_framework.response import Response



class ConfidencialidadViewSet(viewsets.ModelViewSet):
    queryset = Confidencialidad.objects.all().order_by('id')
    serializer_class =ConfidencialidadSerializer
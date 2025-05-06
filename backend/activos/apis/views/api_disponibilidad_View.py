from rest_framework import viewsets,status
from rest_framework.response import Response
from rest_framework.decorators import action
from database.models import Disponibilidad
from activos.apis.serializers import DisponibilidadSerializer


class DisponibilidadViewSet(viewsets.ModelViewSet):
    queryset=Disponibilidad.objects.all().order_by('id')
    serializer_class= DisponibilidadSerializer

class DisponibilidadCustomViewSet(viewsets.ModelViewSet):
    queryset= Disponibilidad.objects.all().order_by('id')
    serializer_class=DisponibilidadSerializer
    

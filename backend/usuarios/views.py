from django.shortcuts import render
from rest_framework import viewsets
from database.models import TipoDocumento, Rolxpermiso
from usuarios.apis.serializers import TipoDocumentoSerializer, RolxPermisoSerializer
from rest_framework.response import Response

class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer

class RolxPermisoViewSet(viewsets.ModelViewSet):
    queryset = Rolxpermiso.objects.all()
    serializer_class = RolxPermisoSerializer
from django.shortcuts import render
from rest_framework import viewsets
from database.models import TipoDocumento
from usuarios.apis.serializers import TipoDocumentoSerializer
from rest_framework.response import Response

class TipoDocumentoViewSet(viewsets.ModelViewSet):
    queryset = TipoDocumento.objects.all()
    serializer_class = TipoDocumentoSerializer


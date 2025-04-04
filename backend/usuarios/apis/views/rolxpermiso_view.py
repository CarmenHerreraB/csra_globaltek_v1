from django.shortcuts import render
from rest_framework import viewsets
from database.models import Rolxpermiso
from usuarios.apis.serializers import  RolxPermisoSerializer
from rest_framework.response import Response


class RolxPermisoViewSet(viewsets.ModelViewSet):
    queryset = Rolxpermiso.objects.all()
    serializer_class = RolxPermisoSerializer
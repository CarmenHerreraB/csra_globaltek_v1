from rest_framework import viewsets
from database.models import Tipodeactivo
from usuarios.apis.serializers import TipoDocumentoSerializer

class TipodeactivoViewset(viewsets.ModelViewSet):
    queryset=Tipodeactivo.objects.all()
    serializer_class= TipoDocumentoSerializer
from rest_framework import viewsets
from database.models import Tipodeactivo
from activos.apis.serializers import TipodeactivoSerializer


class TipodeactivoViewset(viewsets.ModelViewSet):
    queryset=Tipodeactivo.objects.all()
    serializer_class= TipodeactivoSerializer
    
class TipodeactivoCustomViewset(viewsets.ModelViewSet):
    #serializer_class=TipodeactivoSerializer
    pass
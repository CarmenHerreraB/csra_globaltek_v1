from rest_framework import viewsets
from database.models import Custodio
from activos.apis.serializers import CustodioSerializer


class CustodioViewset(viewsets.ModelViewSet):
    queryset =Custodio.objects.all()
    serializer_class = CustodioSerializer
#busqueda multitabla

from rest_framework.generics import RetrieveAPIView  # api especifica para mostrar valores segun su ID - GET solamente
from database.models import Activo
from activos.apis.serializers import ShowActivoValuesSerializer

class ShowActivoValuesView (RetrieveAPIView):
    queryset = Activo.objects.all()
    serializer_class= ShowActivoValuesSerializer
    lookup_field = 'id'
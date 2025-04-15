#busqueda multitabla
from rest_framework.generics import RetrieveAPIView  # api especifica para mostrar valores segun su ID - GET solamente
from rest_framework.generics import ListAPIView # Mostrar lista de activos
from database.models import Activo
from activos.apis.serializers import ShowActivoValuesSerializer

# mostrar solo un activo por su id
class ShowActivoValuesView (RetrieveAPIView):
    queryset = Activo.objects.all()
    serializer_class= ShowActivoValuesSerializer
    lookup_field = 'id'
    

# mostrar lista de activos por su id
class ListAllActivosValuesView(ListAPIView):
    queryset= Activo.objects.all().order_by('id')
    serializer_class=ShowActivoValuesSerializer
    
    

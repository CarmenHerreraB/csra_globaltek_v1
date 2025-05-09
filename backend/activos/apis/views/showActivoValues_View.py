#busqueda multitabla
from rest_framework.generics import RetrieveAPIView  # api especifica para mostrar valores segun su ID - GET solamente
from rest_framework.generics import ListAPIView # Mostrar lista de activos
from database.models import Activo
from activos.apis.serializers import ShowActivoValuesSerializer

# mostrar solo un activo por su id
class ShowActivoValuesView (RetrieveAPIView):
    queryset = Activo.objects.all().order_by('id')
    serializer_class= ShowActivoValuesSerializer
    lookup_field = 'id'
    

# mostrar lista de activos por su id
class ListAllActivosValuesView(ListAPIView):
    serializer_class = ShowActivoValuesSerializer

    def get_queryset(self):
        # Filtrar los activos cuyo estado relacionado con tipo_activo, estadoxactivo o cualquier otro FK esté activo
        queryset = Activo.objects.filter(
            #tipo_activo__estado='activo',  # Filtrar por estado activo en tipo_activo
            datos_personales__estado='activo',  # Filtrar por estado activo en estadoxactivo
            custodio__estado='activo',
            #dueno_activo__estado='activo',
   
        ).order_by('id')
        return queryset
    

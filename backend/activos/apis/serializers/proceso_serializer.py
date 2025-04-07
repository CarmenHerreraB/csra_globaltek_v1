from rest_framework import serializers
from database.models import Proceso

class ProcesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proceso
        fields= '__all__'
    
    
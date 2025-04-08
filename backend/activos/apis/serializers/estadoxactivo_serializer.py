from rest_framework import serializers
from database.models import Estadoxactivo

class EstadoxactivoSerializer(serializers.ModelSerializer):
    class Meta:
        model= Estadoxactivo
        fields= '__all__'
from rest_framework import serializers
from database.models import Criticidad

class CriticidadSerializer(serializers.ModelSerializer):
    class Meta:
        model= Criticidad
        fields= '__all__'
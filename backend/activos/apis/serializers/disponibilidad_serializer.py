from rest_framework import serializers
from database.models import Disponibilidad

class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model= Disponibilidad
        fields = '__all__'
from rest_framework import serializers
from database.models import Integridad


class IntegridadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Integridad
        field = '__all__'
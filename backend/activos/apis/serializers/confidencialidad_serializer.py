from rest_framework import serializers
from database.models import Confidencialidad

class ConfidencialidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Confidencialidad
        fields = '__all__'
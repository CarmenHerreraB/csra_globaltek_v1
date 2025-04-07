from rest_framework import serializers
from database.models import DatospersonaleActivo

class DatospersonalesActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatospersonaleActivo
        fields = '__all__'
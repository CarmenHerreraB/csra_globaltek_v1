from rest_framework import serializers
from database.models import DatospersonaleActivo

class DatospersonalesActivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DatospersonaleActivo
        fields = '__all__'
        
    def update(self, instance, validated_data):
        if instance.is_default:
            raise serializers.ValidationError('No se permite actualizar datos por defecto')
        return super().update(instance, validated_data)
from rest_framework import serializers
from database.models import Proceso

class ProcesoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proceso
        fields= '__all__'
    
    def update(self, instance, validated_data):
        if instance.is_default:
            raise serializers.ValidationError('No se permite actualizar datos por defecto')
        return super().update(instance, validated_data)
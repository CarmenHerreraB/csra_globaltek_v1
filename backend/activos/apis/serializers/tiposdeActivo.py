from rest_framework import serializers
from database.models import Tipodeactivo

class TipodeactivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tipodeactivo
        fields = '__all__'
        

    def update(self, instance, validated_data):
        if instance.is_default:
            raise serializers.ValidationError("No se pueden editar registros por defecto.")
        return super().update(instance, validated_data)
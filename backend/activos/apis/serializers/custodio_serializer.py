from rest_framework import serializers
from database.models import Custodio


class CustodioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custodio
        fields ='__all__'
        
    def update(self, instance, validated_data):
        if instance.is_default:
            raise serializers.ValidationError('No se permite actualizar datos por defecto')
        else:
            return super().update(instance, validated_data)

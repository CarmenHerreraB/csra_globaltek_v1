from rest_framework import serializers
from database.models import Disponibilidad

class DisponibilidadSerializer(serializers.ModelSerializer):
    class Meta:
        model= Disponibilidad
        fields = '__all__'
        
     #traer el valor y color   
    def get_valor_mostrar(self, obj):
        return obj.valorActualizado if  obj.valorActualizado is not None else obj.valor
    def get_color_mostrar(self,obj):
        return obj.colorActualizado if obj.colorActualizado else obj.color
from rest_framework import serializers
from database.models import Criticidad

class CriticidadSerializer(serializers.ModelSerializer):
    class Meta:
        model= Criticidad
        fields= '__all__'
        
        
        #traer los valores y color   
    def get_valor_min_mostrar(self, obj):
        return obj.valor_minActualizado if  obj.valor_minActualizado is not None else obj.valor_min
    def get_valor_max_mostrar(self, obj):
        return obj.valor_maxActualizado if  obj.valor_maxActualizado is not None else obj.valor_max
    def get_color_mostrar(self,obj):
        return obj.colorActualizado if obj.colorActualizado else obj.color
    
    
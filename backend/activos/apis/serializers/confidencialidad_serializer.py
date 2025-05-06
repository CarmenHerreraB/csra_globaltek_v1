from rest_framework import serializers
from database.models import Confidencialidad

class ConfidencialidadSerializer(serializers.ModelSerializer):
    valor_mostrar= serializers.SerializerMethodField()
    color_mostrar= serializers.SerializerMethodField()
    
    class Meta:
        model = Confidencialidad
        fields = '__all__'  
        
    def get_valor_mostrar(self, obj):
        return obj.valorActualizado if  obj.valorActualizado is not None else obj.valor
    def get_color_mostrar(self,obj):
        return obj.colorActualizado if obj.colorActualizado else obj.color
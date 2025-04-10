# Basado en consutas multitablas 
from rest_framework import serializers
from database.models import Activo


class ShowActivoValuesSerializer(serializers.ModelSerializer):
    nombre= serializers.CharField()
    descripcion= serializers.CharField()
    valor=serializers.CharField()
    confidencialidad= serializers.SerializerMethodField()  # metodo para traer datos de otra tabla
    integridad=serializers.SerializerMethodField()
    disponibilidad=serializers.SerializerMethodField()
    criticidad=serializers.SerializerMethodField()
    proceso_area= serializers.CharField(source='proceso_area.nombre')
    tipo_activo= serializers.CharField(source='tipo_activo.nombre')
    datos_personales=serializers.CharField(source='datos_personales.nombre')
    dueno_activo=  serializers.CharField(source='dueno_activo.nombre') 
    custodio=serializers.CharField(source='custodio.nombre') 
    
    class Meta:
        model = Activo
        fields=[
                'id', 
                'nombre', 
                'descripcion', 
                'valor',
                'confidencialidad',
                'integridad',
                'disponibilidad',
                'criticidad',
                'proceso_area',
                'tipo_activo',
                'datos_personales',
                'dueno_activo',
                'custodio',
                ]
    
    def get_confidencialidad(self, obj):
        return obj.estadoxactivo.confidencialidad.estado if obj.estadoxactivo else None 
    
    def get_integridad(self, obj):
        return obj.estadoxactivo.integridad.estado if obj.estadoxactivo else None
    
    def get_disponibilidad(self, obj):
        return obj.estadoxactivo.disponibilidad.estado if obj.estadoxactivo else None
    
    def get_criticidad(self,obj):
        return obj.estadoxactivo.criticidad.estado if obj.estadoxactivo else None
    
    

    
    
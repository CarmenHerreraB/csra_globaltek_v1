# Basado en consutas multitablas 
from rest_framework import serializers
from database.models import Activo

#.SerializerMethodField()  # metodo para traer datos de otra tabla
#.CharField(source='proceso_area.nombre') # metodo para traer datos de la misma tabla
#.IntegerField(source='proceso_area.id') Traer Id


class ShowActivoValuesSerializer(serializers.ModelSerializer):
    nombre= serializers.CharField()
    descripcion= serializers.CharField()
    valor=serializers.CharField()
    confidencialidad= serializers.SerializerMethodField()  # metodo para traer datos de otra tabla
    confidencialidad_id= serializers.SerializerMethodField()
    integridad=serializers.SerializerMethodField()
    integridad_id=serializers.SerializerMethodField()
    disponibilidad=serializers.SerializerMethodField()
    disponibilidad_id=serializers.SerializerMethodField()
    criticidad=serializers.SerializerMethodField()
    criticidad_id=serializers.SerializerMethodField()
    proceso_area= serializers.CharField(source='proceso_area.nombre')
    proceso_area_id = serializers.IntegerField(source='proceso_area.id')
    tipo_activo= serializers.CharField(source='tipo_activo.nombre')
    tipo_activo_id =serializers.IntegerField(source='tipo_activo.id')
    datos_personales=serializers.CharField(source='datos_personales.nombre')
    datos_personales_id= serializers.IntegerField(source='datos_personales.id')
    dueno_activo=  serializers.CharField(source='dueno_activo.nombre') 
    dueno_activo_id= serializers.IntegerField(source='dueno_activo.id')
    custodio=serializers.CharField(source='custodio.nombre') 
    custodio_id= serializers.IntegerField(source='custodio.id')
    
    class Meta:
        model = Activo
        fields=[
                'id', 
                'nombre', 
                'descripcion', 
                'valor',
                'confidencialidad',
                'confidencialidad_id',  
                'integridad',
                'integridad_id',
                'disponibilidad',
                'disponibilidad_id',
                'criticidad',
                'criticidad_id',
                'proceso_area',
                'proceso_area_id',
                'tipo_activo',
                'tipo_activo_id',
                'datos_personales',
                'datos_personales_id',
                'dueno_activo',
                'dueno_activo_id',
                'custodio',
                'custodio_id',
                ]
    
    def get_confidencialidad(self, obj):
        return obj.estadoxactivo.confidencialidad.estado if obj.estadoxactivo else None 
    def get_confidencialidad_id(self, obj):
        return obj.estadoxactivo.confidencialidad.id if obj.estadoxactivo else None 
    
    def get_integridad(self, obj):
        return obj.estadoxactivo.integridad.estado if obj.estadoxactivo else None
    def get_integridad_id(self,obj):
        return obj.estadoxactivo.integridad.id if obj.estadoxactivo else None
    
    def get_disponibilidad(self, obj):
        return obj.estadoxactivo.disponibilidad.estado if obj.estadoxactivo else None
    def get_disponibilidad_id(self, obj):
        return obj.estadoxactivo.disponibilidad.id if obj.estadoxactivo else None
    
    def get_criticidad(self,obj):
        return obj.estadoxactivo.criticidad.estado if obj.estadoxactivo else None
    def get_criticidad_id(self,obj):
        return obj.estadoxactivo.criticidad.id if obj.estadoxactivo else None
    
    

    
    
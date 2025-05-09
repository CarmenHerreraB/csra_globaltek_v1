# Basado en consultas multitablas
from rest_framework import serializers
from database.models import Activo


class ShowActivoValuesSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField()
    descripcion = serializers.CharField()
    valor = serializers.CharField()
    confidencialidad = serializers.SerializerMethodField()
    confidencialidad_id = serializers.SerializerMethodField()
    confidencialidad_color = serializers.SerializerMethodField()
    confidencialidad_colorActualizado=serializers.SerializerMethodField()
    integridad = serializers.SerializerMethodField()
    integridad_id = serializers.SerializerMethodField()
    integridad_color = serializers.SerializerMethodField()
    integridad_colorActualizado=serializers.SerializerMethodField()
    disponibilidad = serializers.SerializerMethodField()
    disponibilidad_id = serializers.SerializerMethodField()
    disponibilidad_color = serializers.SerializerMethodField()
    disponibilidad_colorActualizado=serializers.SerializerMethodField()
    criticidad = serializers.SerializerMethodField()
    criticidad_id = serializers.SerializerMethodField()
    criticidad_color = serializers.SerializerMethodField()
    criticidad_colorActualizado=serializers.SerializerMethodField()
    proceso_area = serializers.SerializerMethodField()
    proceso_area_id = serializers.SerializerMethodField()
    #proceso_area = serializers.CharField(source='proceso_area.nombre',required=False)
    #proceso_area_id = serializers.IntegerField(source='proceso_area.id',required=False)
    tipo_activo = serializers.SerializerMethodField()
    tipo_activo_id = serializers.SerializerMethodField()
    #tipo_activo = serializers.CharField(source='tipo_activo.nombre',required=False)
    #tipo_activo_id = serializers.IntegerField(source='tipo_activo.id',required=False)
    datos_personales = serializers.SerializerMethodField()
    datos_personales_id = serializers.SerializerMethodField()
    #datos_personales = serializers.CharField(source='datos_personales.nombre',required=False)
    #datos_personales_id = serializers.IntegerField(source='datos_personales.id',required=False)
    dueno_activo = serializers.SerializerMethodField()
    dueno_activo_id = serializers.SerializerMethodField()
    #dueno_activo = serializers.CharField(source='dueno_activo.nombre',required=False)
    #dueno_activo_id = serializers.IntegerField(source='dueno_activo.id',required=False)
    custodio = serializers.SerializerMethodField()
    custodio_id = serializers.SerializerMethodField()
    #custodio = serializers.CharField(source='custodio.nombre',required=False)
    #custodio_id = serializers.IntegerField(source='custodio.id',required=False)
    
    
    
    
    
    

    class Meta:
        model = Activo
        fields = [
            'id',
            'nombre',
            'descripcion',
            'valor',
            
            'confidencialidad',
            'confidencialidad_id',
            'confidencialidad_color',
            'confidencialidad_colorActualizado',
            
            'integridad',
            'integridad_id',
            'integridad_color',
            'integridad_colorActualizado',
            
            'disponibilidad',
            'disponibilidad_id',
            'disponibilidad_color',
            'disponibilidad_colorActualizado',
            
            'criticidad',
            'criticidad_id',
            'criticidad_color',
            'criticidad_colorActualizado',
            
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
        
        #METODOS DE CONFIDENCIALIDAD

    def get_confidencialidad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        confidencialidad = getattr(estado, 'confidencialidad', None)
        return getattr(confidencialidad, 'estado', None)
    def get_confidencialidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        confidencialidad = getattr(estado, 'confidencialidad', None)
        return getattr(confidencialidad, 'id', None)
    def get_confidencialidad_color(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        confidencialidad = getattr(estado, 'confidencialidad', None)
        return getattr(confidencialidad, 'color', None)
    def get_confidencialidad_colorActualizado(self, obj):
        try:
            return obj.estadoxactivo.confidencialidad.colorActualizado
        except AttributeError:
            return None
            
  
   
        #METODOS DE INTEGRIDAD
    def get_integridad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        integridad = getattr(estado, 'integridad', None)
        return getattr(integridad, 'estado', None)
    def get_integridad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        integridad = getattr(estado, 'integridad', None)
        return getattr(integridad, 'id', None)
    def get_integridad_color(self,obj):
        estado= getattr(obj, 'estadoxactivo', None)
        integridad= getattr(estado,'integridad',None)
        return getattr(integridad,'color',None)
    def get_integridad_colorActualizado(self,obj):
        try:
            return obj.estadoxactivo.integridad.colorActualizado
        except AttributeError:
            return None
            
        
    
    

        #METODOS DE DISPONIBILIDAD
    def get_disponibilidad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        disponibilidad = getattr(estado, 'disponibilidad', None)
        return getattr(disponibilidad, 'estado', None)
    def get_disponibilidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        disponibilidad = getattr(estado, 'disponibilidad', None)
        return getattr(disponibilidad, 'id', None)
    def get_disponibilidad_color(self,obj):
        estado= getattr(obj, 'estadoxactivo', None)
        disponibilidad= getattr(estado,'disponibilidad',None)
        return getattr(disponibilidad,'color',None)
    def get_disponibilidad_colorActualizado(self,obj):
        try:
         return obj.estadoxactivo.disponibilidad.colorActualizado
        except AttributeError:
         return None
        
    
    
    
        #METODOS DE CRITICIDA

    def get_criticidad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        criticidad = getattr(estado, 'criticidad', None)
        return getattr(criticidad, 'estado', None)
    def get_criticidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        criticidad = getattr(estado, 'criticidad', None)
        return getattr(criticidad, 'id', None)
    def get_criticidad_color(self,obj):
        estado= getattr(obj, 'estadoxactivo', None)
        criticidad= getattr(estado,'criticidad',None)
        return getattr(criticidad,'color',None)
    def get_criticidad_colorActualizado(self,obj):
        try:
         return obj.estadoxactivo.criticidad.colorActualizado
        except AttributeError:
         return None
    
    
    #METODOS DE LAS OTRAS TABLAS DE ACTIVOS
    def get_tipo_activo(self, obj):
     tipo = getattr(obj, 'tipo_activo', None)
     return tipo.nombre if tipo and tipo.estado == 'activo' else None
    def get_tipo_activo_id(self, obj):
      tipo = getattr(obj, 'tipo_activo', None)
      return tipo.id if tipo and tipo.estado == 'activo' else None
  
    def get_datos_personales(self, obj):
      tipo = getattr(obj, 'datos_personales', None)
      return tipo.nombre if tipo and tipo.estado == 'activo' else None
    def get_datos_personales_id(self, obj):
      tipo = getattr(obj, 'datos_personales', None)
      return tipo.id if tipo and tipo.estado == 'activo' else None
    
    def get_dueno_activo(self,obj):
        tipo =getattr(obj,'dueno_activo',None)
        return tipo.nombre if tipo and tipo.estado=='activo' else None
    def get_dueno_activo_id(self,obj):
        tipo= getattr(obj, 'dueno_activo',None)
        return tipo.id if tipo and tipo.estado== 'activo' else None
    
    def get_custodio(self,obj):
        tipo= getattr(obj,'custodio',None)
        return tipo.nombre if tipo and tipo.estado=='activo' else None
    def get_custodio_id(self,obj):
        tipo= getattr(obj,'custodio',None)
        return tipo.id if tipo and tipo.estado=='activo' else None
    
    def get_proceso_area(self, obj):
        tipo= getattr(obj, 'proceso_area', None)
        return tipo.nombre if tipo and tipo.estado=='activo' else None
    
    def get_proceso_area_id(self,obj):
        tipo= getattr(obj, 'proceso_area',None)
        return tipo.id if tipo and tipo.estado=='activo'else None


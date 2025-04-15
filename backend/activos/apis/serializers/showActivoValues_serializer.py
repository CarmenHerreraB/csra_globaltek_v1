# Basado en consultas multitablas
from rest_framework import serializers
from database.models import Activo


class ShowActivoValuesSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField()
    descripcion = serializers.CharField()
    valor = serializers.CharField()
    confidencialidad = serializers.SerializerMethodField()
    confidencialidad_id = serializers.SerializerMethodField()
    integridad = serializers.SerializerMethodField()
    integridad_id = serializers.SerializerMethodField()
    disponibilidad = serializers.SerializerMethodField()
    disponibilidad_id = serializers.SerializerMethodField()
    criticidad = serializers.SerializerMethodField()
    criticidad_id = serializers.SerializerMethodField()
    proceso_area = serializers.CharField(source='proceso_area.nombre',required=False)
    proceso_area_id = serializers.IntegerField(source='proceso_area.id',required=False)
    tipo_activo = serializers.CharField(source='tipo_activo.nombre',required=False)
    tipo_activo_id = serializers.IntegerField(source='tipo_activo.id',required=False)
    datos_personales = serializers.CharField(source='datos_personales.nombre',required=False)
    datos_personales_id = serializers.IntegerField(source='datos_personales.id',required=False)
    dueno_activo = serializers.CharField(source='dueno_activo.nombre',required=False)
    dueno_activo_id = serializers.IntegerField(source='dueno_activo.id',required=False)
    custodio = serializers.CharField(source='custodio.nombre',required=False)
    custodio_id = serializers.IntegerField(source='custodio.id',required=False)

    class Meta:
        model = Activo
        fields = [
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
        estado = getattr(obj, 'estadoxactivo', None)
        confidencialidad = getattr(estado, 'confidencialidad', None)
        return getattr(confidencialidad, 'estado', None)

    def get_confidencialidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        confidencialidad = getattr(estado, 'confidencialidad', None)
        return getattr(confidencialidad, 'id', None)

    def get_integridad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        integridad = getattr(estado, 'integridad', None)
        return getattr(integridad, 'estado', None)

    def get_integridad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        integridad = getattr(estado, 'integridad', None)
        return getattr(integridad, 'id', None)

    def get_disponibilidad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        disponibilidad = getattr(estado, 'disponibilidad', None)
        return getattr(disponibilidad, 'estado', None)

    def get_disponibilidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        disponibilidad = getattr(estado, 'disponibilidad', None)
        return getattr(disponibilidad, 'id', None)

    def get_criticidad(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        criticidad = getattr(estado, 'criticidad', None)
        return getattr(criticidad, 'estado', None)

    def get_criticidad_id(self, obj):
        estado = getattr(obj, 'estadoxactivo', None)
        criticidad = getattr(estado, 'criticidad', None)
        return getattr(criticidad, 'id', None)

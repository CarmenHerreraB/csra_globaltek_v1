from django.db import models
from .confidencialidad import Confidencialidad
from .integridad import Integridad
from .disponibilidad import Disponibilidad
from .criticidad import Criticidad

# Create your models here.
class Activo(models.Model):
    nombre = models.CharField(max_length=255, null=True, blank=True)
    proceso_area = models.CharField(max_length=255, null=True, blank=True)
    tipo = models.CharField(max_length=255, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    valor = models.IntegerField(null=True, blank=True)
    datos_personales = models.CharField(max_length=255, null=True, blank=True)
    dueno_activo = models.CharField(max_length=255, null=True, blank=True)
    custodio = models.CharField(max_length=255, null=True, blank=True)
    confidencialidad=models.ForeignKey(Confidencialidad, on_delete=models.SET_NULL, null=True, blank=True)
    integridad=models.ForeignKey(Integridad, on_delete=models.SET_NULL, null=True, blank=True)
    disponibilidad=models.ForeignKey(Disponibilidad, on_delete=models.SET_NULL, null=True, blank=True)
    criticidad=models.ForeignKey(Criticidad, on_delete=models.SET_NULL, null=True, blank=True)
    
    

    def __str__(self):
        return self.nombre
    
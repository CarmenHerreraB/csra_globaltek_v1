from django.db import models
from .estadoxactivo import Estadoxactivo

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
    
    estadoxactivo=models.ForeignKey(Estadoxactivo, on_delete=models.SET_NULL, null=True, blank=True)
    

    def __str__(self):
        return self.nombre
    
from django.db import models
from .estadoxactivo import Estadoxactivo
from .custodio import Custodio
from .datospersonalesActivo import DatospersonaleActivo
from .tipodeactivo import Tipodeactivo
from .proceso import Proceso
from .duenodeactivo import Duenodeactivo

# Create your models here.
class Activo(models.Model):
    nombre = models.CharField(max_length=255, null=True, blank=True)
    descripcion = models.TextField(null=True, blank=True)
    valor = models.IntegerField(null=True, blank=True)
   
    # tablas con fk 
    proceso_area=models.ForeignKey(Proceso, on_delete=models.SET_NULL, null=True, blank=True)
    tipo_activo=models.ForeignKey(Tipodeactivo, on_delete=models.SET_NULL, null=True, blank=True)
    datos_personales=models.ForeignKey(DatospersonaleActivo, on_delete=models.SET_NULL, null=True, blank=True)
    custodio=models.ForeignKey(Custodio, on_delete=models.SET_NULL, null=True, blank=True)
    dueno_activo=models.ForeignKey(Duenodeactivo, on_delete=models.SET_NULL, null=True, blank=True)
    estadoxactivo=models.ForeignKey(Estadoxactivo, on_delete=models.SET_NULL, null=True, blank=True)
  
    def __str__(self):
        return self.nombre
    
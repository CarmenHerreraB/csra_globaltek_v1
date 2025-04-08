from django.db import models
from .confidencialidad import Confidencialidad
from .integridad import Integridad
from .disponibilidad import Disponibilidad
from .criticidad import Criticidad

class Estadoxactivo(models.Model):
    
        
    confidencialidad=models.ForeignKey(Confidencialidad, on_delete=models.SET_NULL, null=True, blank=True)
    integridad=models.ForeignKey(Integridad, on_delete=models.SET_NULL, null=True, blank=True)
    disponibilidad=models.ForeignKey(Disponibilidad, on_delete=models.SET_NULL, null=True, blank=True)
    criticidad=models.ForeignKey(Criticidad, on_delete=models.SET_NULL, null=True, blank=True)
    
    
    
    def __str__(self):
        return '__all__'
    

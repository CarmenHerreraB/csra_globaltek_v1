from django.db import models
from .confidencialidad import Confidencialidad
from .integridad import Integridad
from .disponibilidad import Disponibilidad
from .criticidad import Criticidad

class Estadoxactivo(models.Model):
    
    confidencialidad = models.ForeignKey(Confidencialidad, on_delete=models.CASCADE)
    integridad = models.ForeignKey(Integridad, on_delete=models.CASCADE)
    disponibilidad = models.ForeignKey(Disponibilidad, on_delete=models.CASCADE)
    criticidad = models.ForeignKey(Criticidad, on_delete=models.CASCADE)

    def __str__(self):
        return f'Estado de {self.activo.nombre}'
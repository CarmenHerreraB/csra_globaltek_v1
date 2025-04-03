from django.db import models


class Proceso(models.Model):
    nombre = models.CharField(max_length=150)
    
    def __str__(self):
        return self.nombre
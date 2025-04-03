from django.db import models

class DatospersonaleActivo(models.Model):
    nombre= models.CharField(max_length=150)
    
    def __str__(self):
        return self.nombre
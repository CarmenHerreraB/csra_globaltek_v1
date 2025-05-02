from django.db import models

class Custodio(models.Model):
    nombre= models.CharField(max_length=150)
    estado=models.CharField(max_length=50, default='activo')
    is_default=models.BooleanField(default=False)
    
    
    def __str__(self):
        return self.nombre
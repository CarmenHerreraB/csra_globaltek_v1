from django.db import models

# Create your models here.

class Empresa(models.Model):
    nombre = models.CharField(max_length=255)
    nit = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.nombre
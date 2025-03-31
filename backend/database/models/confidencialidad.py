from django.db import models

# Create your models here.
class Confidencialidad(models.Model):
    estado = models.CharField(max_length=255)
    valor = models.IntegerField()

    def __str__(self):
        return self.estado
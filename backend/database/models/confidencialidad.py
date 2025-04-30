from django.db import models

# Create your models here.
class Confidencialidad(models.Model):
    estado = models.CharField(max_length=255)
    valor = models.IntegerField()
    valorActualizado = models.IntegerField(null=True,blank=True)
    color= models.CharField(max_length=9, default='#FFFFFF')
    #activo=models.BooleanField(default=True)
    estadoCriterio=models.CharField(max_length=10, default='activo')
    is_default=models.BooleanField(default=False)

    def __str__(self):
        return self.estado
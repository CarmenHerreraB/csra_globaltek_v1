from django.db import models

# Create your models here.
class Criticidad(models.Model):
    estado = models.CharField(max_length=255)
    valor_min = models.IntegerField()
    valor_max=models.IntegerField(default=10)
    color= models.CharField(max_length=9, default='#FFFFFF')
    valor_minActualizado = models.IntegerField(null=True)
    valor_maxActualizado=models.IntegerField(null=True)
    colorActualizado= models.CharField(max_length=9, null=True)
    estadoCriterio=models.CharField(max_length=10, default='activo')
    is_default=models.BooleanField(default=False)

    def __str__(self):
        return self.estado
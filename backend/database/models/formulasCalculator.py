from django.db import models
from .usuario import Usuario

class FormulasCalculator (models.Model):
    formula=models.TextField()
    estado=models.CharField()
    default=models.CharField()
    usuario=models.ForeignKey(Usuario, on_delete=models.SET_NULL, null=True, blank=True)
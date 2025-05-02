from django.db import models


class FormulasCalculator (models.Model):
   # ESTADO_CHOICES=[
    #    ('activo','Activo'),
    #   ('inactivo', 'Inactivo'),
    #]
    
    formula=models.TextField()
    estado=models.CharField(default='inactivo')
    default = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.formula} (Estado: {self.estado}, Default: {self.default})"
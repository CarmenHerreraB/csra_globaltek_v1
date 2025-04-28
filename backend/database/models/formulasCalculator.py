from django.db import models


class FormulasCalculator (models.Model):
    ESTADO_CHOICES=[
        ('activo','Activo'),
        ('inactivo', 'Inactivo'),
    ]
    
    formula=models.TextField()
    estado=models.CharField(max_length=50, choices=ESTADO_CHOICES, default='inactivo')
    default = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.formula[:30]} (Estado: {self.estado}, Default: {self.default})"
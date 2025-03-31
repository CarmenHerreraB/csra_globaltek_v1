from django.db import models
from .roles import Rol
from .permisos import Permiso


# Create your models here.
class Rolxpermiso(models.Model):
    rol = models.ForeignKey(Rol, on_delete=models.SET_NULL, null=True, blank=True)
    permiso = models.ForeignKey(Permiso, on_delete=models.SET_NULL, null=True, blank=True)
    

    def __str__(self):
        return self.rol
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, Group, Permission
from .tipodocumento import TipoDocumento
from .empresa import Empresa
from .otp_code import OTPCode
from .usuarioManager import UsuarioManager
from .rolxpermiso import Rolxpermiso


#Con AbstractBaseUser se añade password y  last_login
# Con PermissionsMixin se añade is_superuser
class Usuario(AbstractBaseUser, PermissionsMixin):
    nombre = models.CharField(max_length=255, null=True, blank=True)
    numero_documento = models.CharField(max_length=255, null=True, blank=True)
    telefono = models.CharField(max_length=255, null=True, blank=True)
    correo = models.EmailField(unique=True, null=False)
    #contrasena = models.CharField(max_length=255)  # validar si la contraseña se hace automatica
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    tipo_documento = models.ForeignKey(TipoDocumento, on_delete=models.SET_NULL, null=True, blank=True, default=1)
    empresa = models.ForeignKey(Empresa, on_delete=models.SET_NULL, null=True, blank=True)
    rolxpermiso = models.ForeignKey(Rolxpermiso, on_delete=models.SET_NULL, null=True, blank=True)
    otp_code = models.ForeignKey(OTPCode, on_delete=models.SET_NULL, null=True, blank=True)
    
    groups = models.ManyToManyField(
        Group,
        related_name='custom_usuario_groups',  # related_name único para evitar conflicto
        blank=True
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_usuario_permissions',  # related_name único para evitar conflicto
        blank=True
    )
    
    
    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.correo
    
    
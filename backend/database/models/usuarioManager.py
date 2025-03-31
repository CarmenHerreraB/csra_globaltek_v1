from django.db import models
from django.contrib.auth.models import BaseUserManager


class UsuarioManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo electrónico es obligatorio')
        correo = self.normalize_email(correo)
        usuario = self.model(correo=correo, **extra_fields)
        usuario.set_password(password) 
        usuario.save(using=self._db)
        return usuario
        
        
        #if password:
         #   usuario.set_password(password) # campo password de AbstractBaseUser por defecto
        #else:
         #   raise ValueError('La contraseña es obligatoria para crear el usuario')
        #usuario.save(using=self._db)
        #return usuario
        


    def create_superuser(self, correo, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        
        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser debe tener is_superuser=True.')

        return self.create_user(correo, password, **extra_fields)
        
    
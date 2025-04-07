from django.contrib import admin
from .models import Activo,Confidencialidad,Criticidad,Disponibilidad,Empresa,Estadoxactivo,Integridad,OTPCode,Permiso,Rol,TipoDocumento,Usuario,Rolxpermiso,Custodio,DatospersonaleActivo,Tipodeactivo,Proceso,Duenodeactivo

# Register your models here.
admin.site.register(Activo)
admin.site.register(Confidencialidad)
admin.site.register(Criticidad)
admin.site.register(Disponibilidad)
admin.site.register(Empresa)
admin.site.register(Estadoxactivo)
admin.site.register(Integridad)
admin.site.register(OTPCode)
admin.site.register(Permiso)
admin.site.register(Rol)
admin.site.register(TipoDocumento)
admin.site.register(Usuario)
admin.site.register(Rolxpermiso)
admin.site.register(Custodio)
admin.site.register(DatospersonaleActivo)
admin.site.register(Tipodeactivo)
admin.site.register(Proceso)
admin.site.register(Duenodeactivo)


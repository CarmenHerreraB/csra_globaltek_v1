from django.db import models

# Create your models here.
class TipoDocumento(models.Model):
    DOCUMENT_TYPE_CHOICES = [
        ('CC', 'Cédula de ciudadanía'),
        ('CE', 'Cédula de extranjería'),
        ('NIT', 'Número de identificación tributaria'),
        ('PP', 'Pasaporte'),
        ('PEP','Permiso especial de permanencia'),
        ('DIE', 'Documento de identificación extranjero'),
        
        ]
    
    nombre = models.CharField(max_length=255,choices=DOCUMENT_TYPE_CHOICES,unique=True)
    

    def __str__(self):
        return self.get_nombre_display()

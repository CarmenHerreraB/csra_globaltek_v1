
from .models.estadoxactivo import Estadoxactivo

def validarValorCriticidad(activo):
        estados = Estadoxactivo.objects.filter(activo=activo)
        total_valor = 0
        
        print (estados)
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from activos.apis.serializers import CalculatorSerializer
from database.models import Confidencialidad, Integridad, Disponibilidad
import re

class CalculatorView(APIView):
    def post(self, request):
        serializer = CalculatorSerializer(data=request.data)
        
        if serializer.is_valid():
            expression = serializer.validated_data['expression']

            # Obtener el primer valor de cada tabla
            confidencialidad = Confidencialidad.objects.first()
            integridad = Integridad.objects.first()
            disponibilidad = Disponibilidad.objects.first()

            if not (confidencialidad and integridad and disponibilidad):
                return Response({'error': 'Faltan valores en las tablas'}, status=status.HTTP_404_NOT_FOUND)

            # Extraer los valores numéricos
            reemplazos = {
                'confidencialidad': str(confidencialidad.valor),
                'integridad': str(integridad.valor),
                'disponibilidad': str(disponibilidad.valor),
            }

            # Reemplazar las palabras en la expresión
            for var, val in reemplazos.items():
                expression = re.sub(rf'\b{var}\b', val, expression, flags=re.IGNORECASE)

            # Validar expresión
            if not re.match(r'^[\d+\-*/().\s]+$', expression):
                return Response({'error': 'Caracteres inválidos en la expresión'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                result = eval(expression, {"__builtins__": None}, {})
                return Response({'Result': result}, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': f'Error al evaluar la expresión: {str(e)}'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'error': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

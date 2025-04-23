from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from activos.apis.serializers import CalculatorSerializer
import re

class CalculatorView(APIView):
    def post(self,request):
        serializer=CalculatorSerializer(data=request.data)
        
        if serializer.is_valid():
            expression=serializer.validated_data['expression']
            if not re.match(r'^[\d+\-*/().\s]+$', expression):  #validar caracteres correctos en el display de la calculadora
                return Response({'error': 'Invalid characters in expression'}, status=status.HTTP_400_BAD_REQUEST) 
            try:
                result= eval(expression,{"__builtins__": None},{})   #{"__builtins__": None} seguridad para que no ingresen datos maliciosos
                return Response({'Result': result}, status=status.HTTP_200_OK)      
            except Exception as e:
                return Response({'error': str(e)},status=status.HTTP_400_BAD_REQUEST) 
        return Response({'error': serializer.errors},status=status.HTTP_400_BAD_REQUEST )    
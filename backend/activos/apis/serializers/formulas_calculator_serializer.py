from rest_framework import serializers
from database.models.formulasCalculator import FormulasCalculator

class FormulasCalculatorSerializer(serializers.ModelSerializer):
    class Meta:
        model= FormulasCalculator
        fields= '__all__'
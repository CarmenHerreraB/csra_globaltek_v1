from rest_framework import serializers
from database.models import Duenodeactivo

class DuenodeactivoSerializer(serializers.ModelSerializer):
    class Meta:
        model=Duenodeactivo
        fields= '__all__'
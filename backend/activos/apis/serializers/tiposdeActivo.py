from rest_framework import serializers
from database.models import Tipodeactivo

class TipodeactivoSerializer(serializers.ModelSerializer):
    model = Tipodeactivo
    fields = '__all__'
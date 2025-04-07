from rest_framework import serializers
from database.models import Custodio


class CustodioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Custodio
        fields ='__all__'

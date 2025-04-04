from rest_framework import serializers
from database.models import Rolxpermiso

class RolxPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rolxpermiso
        fields = '__all__'

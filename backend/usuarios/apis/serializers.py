from rest_framework import serializers
from database.models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        
        
  
    def create(self, validated_data):
        instance= Usuario()
        instance.nombre=  validated_data.get("nombre")
        instance.numero_documento = validated_data.get("numero_documento")
        instance.telefono = validated_data.get("telefono")
        instance.correo = validated_data.get("correo")
        instance.set_password(validated_data.get("password")) # encriptar contrañesa
        instance.tipo_documento = validated_data.get("tipo_documento")
        instance.empresa = validated_data.get("empresa")
        instance.rolxpermiso = validated_data.get("rolxpermiso")
        instance.save()
        return instance
        
       
     #Validacion si ya esta registrado el correo   
    def validate_email(self,data):
        usuarios= Usuario.objects.filter(correo = data)
        if len (usuarios) !=0:
            raise serializers.ValidationError('Este correo ya esta registrado ingrese otro correo')
        else:
            return data
            

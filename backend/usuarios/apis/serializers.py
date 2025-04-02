from rest_framework import serializers
from database.models import Usuario, Empresa, TipoDocumento, Rolxpermiso

class TipoDocumentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoDocumento
        fields = '__all__'

class RolxPermisoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rolxpermiso
        fields = '__all__'

class UsuarioSerializer(serializers.ModelSerializer):
    #empresa = serializers.CharField() #Recibe el nombre de la empresa en lugar de ID

    class Meta:
        model = Usuario
        fields = '__all__'
        
        
  
    def create(self, validated_data):
       # empresa_nombre =validated_data.pop("empresa") # se extrae el nombre de la empresa
       #empresa, created =Empresa.objects.get_or_create(nombre=empresa_nombre)  # se valida si existe o se crea
        
        
        instance= Usuario()
        instance.nombre=  validated_data.get("nombre")
        instance.numero_documento = validated_data.get("numero_documento")
        instance.telefono = validated_data.get("telefono")
        instance.correo = validated_data.get("correo")
        instance.set_password(validated_data.get("password")) # encriptar contrañesa
        instance.tipo_documento = validated_data.get("tipo_documento") 
        #instance.empresa = empresa # asigna la empresa
        instance.empresa=validated_data.get("empresa")
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
    
    #VALIDACION PARA EL NIT DE LA EMPRESA NO SE USA AUN PORQUE EL REGISTRO NO LO REQUIERE
    #def validate_nit(self,data):
    #    empresa= Empresa.objects.filter(nit = data)
    #    if len (empresa) !=0: #True
    #        raise serializers.ValidationError('Este NIT  ya esta registrado ingrese otro')
    #    else:
    #        return data
            

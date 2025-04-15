from rest_framework import viewsets # genera endpoints  #DRF =django rest framework
from rest_framework.response import Response  # Respuestas Http
from rest_framework import status # estados HTTP (201,401,400,etc..)
from database.models import Activo,Criticidad  # Importar el modelo de Activos que esta en la app database del proyecto
from database.models import Estadoxactivo
from activos.apis.serializers import ActivoSerializer # importar serializer de Activos
from activos.apis.serializers import EstadoxactivoSerializer

class ActivoViewSet(viewsets.ModelViewSet):
    queryset= Activo.objects.all()     #modelo
    serializer_class =ActivoSerializer # serializer
    
    def validarValorCriticidad(self, activo):
        estado = activo.estadoxactivo
        total_valor = 0
        
        if estado:
            if estado.confidencialidad:
                total_valor += estado.confidencialidad.valor
            if estado.integridad:
                total_valor += estado.integridad.valor
            if estado.disponibilidad:
                total_valor += estado.disponibilidad.valor
        
        #Guardarlo en el campo valor
        activo.valor = total_valor
        activo.save()
        
        criticidad_id=  None
        if total_valor <=5:
            criticidad_id=3 #"Baja"
        elif total_valor <=10:
            criticidad_id=2 #"Media"
        else:
            criticidad_id=1 # "Alta"
        
        try:
            criticidad_obj= Criticidad.objects.get(id=criticidad_id)
            estado.criticidad=criticidad_obj
            estado.save()
        except Criticidad.DoesNotExist:
            Response({"error": "error al validar criticidad"}, status=status.HTTP_400_BAD_REQUEST)
    
    #CREAR ACTIVO - metodo POST
    def create(self, request):  
        estadoxactivo_data= request.data.get("estadoxactivo")
        estadoxactivo_serializer = EstadoxactivoSerializer(data=estadoxactivo_data)
        if estadoxactivo_serializer.is_valid():
            estado= estadoxactivo_serializer.save()
            
            #copia del request y agregar el id
            activo_data= request.data.copy()
            activo_data["estadoxactivo"]=estado.id
            
            #usar ActivoSerializer
            
            activo_serializer= self.get_serializer(data=activo_data)
            if activo_serializer.is_valid():
                activo_serializer.save()
                self.validarValorCriticidad(activo_serializer.instance)
                
                return Response({"message": "El Activo se agrego exitosamente."}, status=status.HTTP_201_CREATED)
            else: 
                estado.delete() #si falla eliminamos el estadoxactivo
                return Response({
                "message": "Error al agregar activo.",
                "errors": activo_serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        else:    
             return Response({
            "message": "Error al agregar activo.",
            "errors": estadoxactivo_serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
             
             
    #ACTUALIZAR ACTIVO- Metodo PUT
    def update(self, request, pk=None , *args, **kwargs):   #pk recibe el id del objeto y *args, **kwargs  recibe argumentos adicionales de DRF evita errores en el futuro
        try:
            activo= self.get_object()
            estadoxactivo_data= request.data.get("estadoxactivo")
            #actualizar estadoxactivo
            if estadoxactivo_data:
                #obtener informacion
                estado_obj= activo.estadoxactivo #obtener el estado ya relacionado en activo
                estadoxactivo_serializer= EstadoxactivoSerializer(estado_obj, data=estadoxactivo_data)
                
                #validacion
                if estadoxactivo_serializer.is_valid():
                    estadoxactivo_serializer.save()
                    
                else: 
                    return Response({"message":"Error al actualizar activo.", 
                                     "error": estadoxactivo_serializer.errors  },
                                    status=status.HTTP_400_BAD_REQUEST)
                
                
            # Actualizar activo
             #copia del request y agregar el id de la tabla estadoxactivo
            activo_data= request.data.copy()
            activo_data["estadoxactivo"]=activo.estadoxactivo.id  # traer el id de la tabla estadoxactivo
            activo_serializer= self.get_serializer(activo, data=activo_data)
            
            
            if activo_serializer.is_valid():
                activo_serializer.save()
                self.validarValorCriticidad(activo_serializer.instance)
                return Response({"message":"El activo se ha actualizado correctamente"}, status=status.HTTP_200_OK)
            else:
                return Response({"message":"Error al actualizar activo.",
                                 "error":activo_serializer.errors}, 
                                status=status.HTTP_400_BAD_REQUEST)
        except Activo.DoesNotExist:
            return Response({"message": "El activo no fue encontrado."}, status=status.HTTP_404_NOT_FOUND)

    
      
    #ELIMINAR ACTIVO   
    def destroy(self, request, pk=None, *args, **kwargs) :  #pk recibe el id del objeto
        try:
            activo=self.get_object()
            activo.delete()
            return Response({"message":"Activo eliminado con éxito."}, status=status.HTTP_200_OK)
        except Activo.DoesNotExist:
            return Response({"message":"El activo no fue encontrado."},status=status.HTTP_404_NOT_FOUND)
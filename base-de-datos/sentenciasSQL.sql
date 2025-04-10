
-------------------------------------------------------------------------------------------
------------------------------- COMANDOS SQL ----------------------------------------------
-------------------------------------------------------------------------------------------


------------------eliminar todos los registros de una tabla y reestablecer su id----------
TRUNCATE TABLE database_disponibilidad RESTART IDENTITY CASCADE;

SELECT * FROM public.database_disponibilidad
ORDER BY id ASC

-----------------------------------Mostrar tablas--------------- -----------------

SELECT * FROM public.database_disponibilidad
ORDER BY id ASC

--------------------Insertan registros de las tablas del proyecto---------------------

--tipo de documento
INSERT INTO database_tipodocumento(nombre)
VALUES ('Cédula de ciudadanía (CC)');
INSERT INTO database_tipodocumento(nombre)
VALUES ('Cédula de extranjería (CE)');
INSERT INTO database_tipodocumento(nombre)
VALUES ('Número de identificación tributaria (NIT)');
INSERT INTO database_tipodocumento(nombre)
VALUES ('Pasaporte (PP)');
INSERT INTO database_tipodocumento(nombre)
VALUES ('Permiso especial de permanencia (PEP)');
INSERT INTO database_tipodocumento(nombre)
VALUES ('Documento de identificación extranjero (DIE)');

SELECT * FROM public.database_tipodocumento
ORDER BY id ASC 

--Rol
INSERT INTO database_rol(nombre)
VALUES ('Admin');
INSERT INTO database_rol(nombre)
VALUES ('Customer');

SELECT * FROM public.database_rol
ORDER BY id ASC 

--Permiso
INSERT INTO database_permiso(nombre)
VALUES ('All');
INSERT INTO database_permiso(nombre)
VALUES ('Read and write');
SELECT * FROM public.database_permiso

SELECT * FROM public.database_permiso
ORDER BY id ASC 

--Confidencialidad
INSERT INTO database_confidencialidad(estado,valor)
VALUES ('Reservada',5);
INSERT INTO database_confidencialidad(estado,valor)
VALUES ('Clasificada',3);
INSERT INTO database_confidencialidad(estado,valor)
VALUES ('Pública',1);
INSERT INTO database_confidencialidad(estado,valor)
VALUES ('No clasificada',5);

SELECT * FROM public.database_confidencialidad
ORDER BY id ASC 


--integridad
INSERT INTO database_integridad(estado,valor)
VALUES ('Alta',5);
INSERT INTO database_integridad(estado,valor)
VALUES ('Media',3);
INSERT INTO database_integridad(estado,valor)
VALUES ('Baja',1);
INSERT INTO database_integridad(estado,valor)
VALUES ('No clasificada',5);

SELECT * FROM public.database_integridad
ORDER BY id ASC 

--disponibilidad
INSERT INTO database_disponibilidad(estado,valor)
VALUES ('Alta',5);
INSERT INTO database_disponibilidad(estado,valor)
VALUES ('Media',3);
INSERT INTO database_disponibilidad(estado,valor)
VALUES ('Baja',1);
INSERT INTO database_disponibilidad(estado,valor)
VALUES ('No clasificada',5);

SELECT * FROM public.database_disponibilidad
ORDER BY id ASC 

--Criticidad
INSERT INTO database_criticidad(estado,valor)
VALUES ('Alta',15);
INSERT INTO database_criticidad(estado,valor)
VALUES ('Media',10);
INSERT INTO database_criticidad(estado,valor)
VALUES ('Baja',5);

SELECT * FROM public.database_criticidad
ORDER BY id ASC 

--Tipo de Activo
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Información digital');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Información física');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Hardware');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Software');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Personas (Roles)');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Infraestructura - Acceso');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Infraestructura - Almacenamiento');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Infraestructura - Instalaciones');
INSERT INTO database_tipodeactivo(nombre)
VALUES ('Infraestructura - Utilidades');

SELECT * FROM public.database_tipodeactivo
ORDER BY id ASC 

-- Proceso
INSERT INTO database_proceso(nombre)
VALUES ('TI');
INSERT INTO database_proceso(nombre)
VALUES ('Calidad');
INSERT INTO database_proceso(nombre)
VALUES ('Comercial');
INSERT INTO database_proceso(nombre)
VALUES ('Servicios');
INSERT INTO database_proceso(nombre)
VALUES('Logística');

SELECT * FROM public.database_proceso
ORDER BY id ASC 

--custodio
INSERT INTO database_custodio(nombre)
VALUES ('Gerente');
INSERT INTO database_custodio(nombre)
VALUES ('Director');
INSERT INTO database_custodio(nombre)
VALUES ('Usuario');

SELECT * FROM public.database_custodio
ORDER BY id ASC 

--datos personales activo
INSERT INTO database_datospersonaleactivo(nombre)
VALUES ('Sensible');
INSERT INTO database_datospersonaleactivo(nombre)
VALUES ('Privado');
INSERT INTO database_datospersonaleactivo(nombre)
VALUES ('Semiprivado');
INSERT INTO database_datospersonaleactivo(nombre)
VALUES ('Público');
INSERT INTO database_datospersonaleactivo(nombre)
VALUES('No Clasificada');

SELECT * FROM public.database_datospersonaleactivo
ORDER BY id ASC 

--Dueño del activo
INSERT INTO database_duenodeactivo(nombre)
VALUES ('Gerente');
INSERT INTO database_duenodeactivo(nombre)
VALUES ('Director');
INSERT INTO database_duenodeactivo(nombre)
VALUES('Usuario');

SELECT * FROM public.database_duenodeactivo
ORDER BY id ASC 




--------------------------------------------------------------------------------------------------------------------------
--------------------------CONSULTA MULTITABLAS ACTIVOS PARA MOSTRAR LOS VALORES DE LA TABLA ACTIVOS-----------------------
--------------------------------------------------------------------------------------------------------------------------

SELECT ac.id, ac.nombre nombre_activo, ac.descripcion,ac.valor, 
con.estado AS confidencialidad, 
inte.estado AS integridad,
dis.estado AS disponibilidad,
crit.estado AS criticidad,
pro.nombre AS proceso, 
tipo.nombre AS tipodeactivo,
datper.nombre AS datospersonales,
dueact.nombre AS duenodeactivo,
cust.nombre AS custodio

FROM database_activo as ac 

INNER JOIN database_estadoxactivo as es on ac.estadoxactivo_id = es.id  
INNER JOIN database_confidencialidad as con on es.confidencialidad_id = con.id
INNER JOIN database_integridad as inte on es.integridad_id = inte.id
INNER JOIN database_disponibilidad as dis on es.disponibilidad_id = dis.id
INNER JOIN database_criticidad as crit on es.criticidad_id = crit.id
INNER JOIN database_proceso as pro on  ac.proceso_area_id = pro.id
INNER JOIN database_tipodeactivo as tipo on ac.tipo_activo_id = tipo.id
INNER JOIN database_datospersonaleactivo as datper on ac.datos_personales_id = datper.id
INNER JOIN database_duenodeactivo as dueact on ac.dueno_activo_id = dueact.id
INNER JOIN database_custodio as cust on ac.custodio_id = cust.id

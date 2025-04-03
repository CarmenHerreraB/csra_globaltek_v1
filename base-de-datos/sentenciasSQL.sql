
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

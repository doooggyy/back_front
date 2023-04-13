# 0. Introducción

La  universidad  Digital  de  Antioquia  necesita  llevar  el  control  de  los  equipos  de  cómputo (computadores  (escritorio  y  portátiles),  mouse,  teclado,  monitores,  etc.),  móviles  (celulares,  tabletas,  parlantes,  etc.),  etc.  Para  ello  requiere  contar  con  una  aplicación  web  en  donde  se registren los datos de los distintos equipos que tienen actualmente en su inventario para tener un mejor control de dichos equipos.

# 1. Instalación

## 1.1 Restaurar base de datos

El archivo `script.sql` contiene datos de demostración para empezar a realizar consultas y nuevas inserciones de datos.

Se debe restaurar en el servidor MySQL Server (disponible en XAMPP, WAMPP o la instalación estándar del servidor).

## 1.2 Instalar NodeJS

Se debe instalar NodeJS en el servidor para poder ejecutar el servidor web de ExpressJS.

## 1.3 Instalar dependencias

Se deben instalar las dependencias del proyecto con el comando `npm install`.

## 1.4 Ejecutar servidor

Se debe ejecutar el servidor con el comando `node main`.

# 2. Uso

## 2.1 Inicio de sesión

Para ingresar al sistema se debe ingresar el usuario y contraseña de un usuario registrado en el sistema.

Se puede escribir este comando CURL para ingresar al sistema:

`curl --location --request POST 'http://localhost:6173/api/usuarios/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "andres@gmail.com",
    "password": "@nDr3s2k-@"
}'`

El token de sesión se debe guardar para poder realizar las demás peticiones.

## 2.2 Crear una marca

`curl --location --request POST 'http://localhost:6173/api/marcas' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjp7ImlkIjo2LCJlbWFpbCI6Imx1aXNAbWFpbC5jbyIsInJvbCI6MX0sImlhdCI6MTY3MDY3ODk1MCwiZXhwIjoxNjcwNzY1MzUwfQ.hTs_3ADvkDx2U7CxCP7SGZUyqJG5df5hkzh5jPFH9LQ' \
--header 'Content-Type: application/json' \
--data-raw '{
    "nombre": "Marca 11",
    "estado": "Activo"
}'`

**Nota**: Tener en cuenta que el token debe ser cambiado por el que se obtuvo en el inicio de sesión.

## 2.3 Consultar todas las marcas

`curl --location --request GET 'http://localhost:6173/api/marcas'`


Se sigue un proceso similar para los demás recursos.

Se adjunta el archivo de colección de Postman para realizar las pruebas.


# 3. Usuarios disponibles:

## 3.1 Administrador

`Email: andres@gmail.com`
`Password: @nDr3s2k-@`

## 3.2 Usuario

`Email: daniela@gmail.com`
`Password": D@n13l@2k23`

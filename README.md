# BackEnd API Tesis 2019!

  - Sistema para llevar el control del backend para la tesis 2019.
  - Arquitectura basada en NodeJs + Express
  - Utilizacion de Sequelize ORM
  - Integracion con PostgreSQL
  - Autentificacion mediante Jwt

### Installation

1-Instalar NodeJs [Node.js](https://nodejs.org/).

```sh
$ apt-get update
$ sudo apt install nodejs
$ sudo apt install npm
```
2-Clonar repositorio.
```sh
$ git clone https://github.com/Carloxmof1/BackEnd.git
```
3-Instalar las dependencias.

```sh
$ cd BackEnd
$ npm install
$ npm install -g sequelize-cli
```

4-Instalar y configurar PostgreSQL (En caso de que la BD este alojada en otro servidor, omitir este paso).

```sh
$ sudo apt-get install postgresql postgresql-contrib
$ sudo -u postgres createdb BackEnd
$ sudo -u postgres psql postgres 
-> Ingresar password
$ ctrl + D


```
5-Crear y configurar archivo .env con los siguientes campos:

```sh
API_HOST = "IP del servidor" 
API_PORT = "Puerto" 
DB_USERNAME = "Nombre del usuario" (postgres)
DB_PASSWORD = "Password del usuario" (password ingresada en el paso 4)
DB_DATABASE = "Nombre de la base de datos"(BackEnd)
DB_HOST ="Conexion a la base de datos" (local=127.0.0.1)
```
6-Migrar y subir semillas a la base de datos.
```sh
$ sequelize db:migrate
$ sequelize seed:all
```

7-Iniciar Aplicacion.
```sh
$ npm start
```

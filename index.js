const conection = require("./database/conection") 
const express = require("express")
const cors = require("cors")
const morgan = require('morgan');
const routes = require('./routes/index.js');

//conexion a la base de datos

conection();

//crear servidor de node

const app = express();

const PUERTO = 3001;

//configurar cors

app.use(cors()); // para el cors se necesita de un middleware

//Convertir los datos del body a js

app.use(express.json());

app.use(express.urlencoded({extended: true})); 

app.use(morgan('dev'))

//Cargar y configurar rutas 

app.use('/', routes);

//poner servidor a esuchar peticiones Http

app.listen(PUERTO, () => {

    console.log("Servidor corriendo en el puerto " + PUERTO )

})
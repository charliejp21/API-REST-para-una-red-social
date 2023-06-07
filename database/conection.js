require('dotenv').config();
const mongoose = require("mongoose")
const {DB_NAME} = process.env;

const conection = async() =>{

    try {
        
        await mongoose.connect(`mongodb://127.0.0.1:27017/${DB_NAME}`)

        console.log("Se ha conectado correctamente a la DB")

    } catch (error) {

        console.log(error);

        throw new Error("No se ha podido concectar a la base de datos");
        
    }

}

module.exports = conection;
const registerUserDb = require('../controllers/userController')


const registerUser = (req, res) => {

    //Recoger datos de la petición
    const {name, subname, nick, email, password} = req.body;

    //Comprobar que me llegan bien los datos(+ validacion)
    if(!name || !email || !nick || !password){

        return res.status(400).json({

            status: "error",
            message: "Faltan datos por enviar"

        })

    }

    //Control de usuarios duplicados
    const userSave = registerUserDb(name, subname, nick, email, password)

    //Cifrar la contraseña

    //Guradar en la base de datos 

    //Devolver el resultadado


}

module.exports = {pruebaUser, registerUser}
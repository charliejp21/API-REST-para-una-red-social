const {registerUserDb, duplicatedUserDb, loginFind, findUserById} = require('../controllers/userController');

//importar servicios
const createToken = require("../services/jwt")

//Registrar usuario
const registerUser = async (req, res) => {

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
    try {

        const duplicatedUser = await duplicatedUserDb(email, nick);

        if(duplicatedUser && duplicatedUser.length >= 1){

            return res.status(200).send({

                status: "success",
                message: "El usuario ya existe"

            })

        }else{

            //Crear registro de usuario en la db
            const userSave = await registerUserDb(name, subname, nick, email, password)

            //Devolver el resultadado
            return res.status(201).json({

                status: "success",
                mensaje: "Usuario creado",
                user: userSave.name,
                email: userSave.email
            })


        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al crear el usuario"

        })
        
    }

   
}

// Login
const loginUser = async(req, res) => {

    //Recoger parametro del body
    const {email, password} = req.body

    //Buscar en bd si existe y comprar contraseña

    if(!email || !password){

        return res.status(400).send({

            status: "success",
            mensaje: "Faltan datos por enviar"
        })
    }

    try {

        const findUserDb = await loginFind(email, password)

        if(findUserDb){

            //Conseguir token

            const token = createToken(findUserDb)

            //Devolver datos del usuario

            return res.status(200).send({

                status: "success",
                mensaje: "Te has identificado exitosamente",
                usuario: {
                    id: findUserDb._id,
                    user:findUserDb.name,
                    nick: findUserDb.nick,
                    token: token,
                }
            })

        }else{

            return res.status(400).send({

                status: "success",
                mensaje: "La información proporcionada no coincide"

            })

        }


    } catch (error) {

        return res.status(500).send({

            status: "error",
            mensaje: "Error del servidor al ejecutar el login"

        })
        
    }


}

//mi-cuenta
const miCuenta = async(req, res) => {

    return res.status(200).json({

        status: "success",
        user: req.user
    })

}

//mi-perfil
const miPerfil = async(req, res) => {

    const {id} = req.params;

    //consultar
    try {

        const findUser = await findUserById(id)

        if(findUser._id){

            return res.status(200).json({
            
                status: "success",
                user: findUser

            })

        }

    } catch (error) {

        return res.status(400).json({

            status: "error",
            message: "No fue posible encontrar un perfil con el id indicado"
        })

    }

    return res.status(500).json({

        status: "error",
        message: "Error del servidor al obtener el perfil con el id solicitado"
    
    })

}

module.exports = {registerUser, loginUser, miCuenta, miPerfil};
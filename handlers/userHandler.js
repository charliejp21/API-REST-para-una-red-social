const bcrypt = require('bcrypt')
const {registerUserDb, duplicatedUserDb}= require('../controllers/userController')


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

        const duplicatedUser = await duplicatedUserDb(name, email);

        if(duplicatedUser && duplicatedUser.length >= 1){

            return res.status(200).send({

                status: "success",
                message: "El usuario ya existe"

            })

        }else{

            //Cifrar la contraseña (se utilza la librebreia bcrypt-nodejs)(el son los cifrados sobre cifrados, es como el nivel de seguridad)
            const hashedPassword = await bcrypt.hash(password, 10)

            //Crear registro de usuario en la db
            try {
                
                const userSave = await registerUserDb(name, subname, nick, email, hashedPassword)

                //Devolver el resultadado
                return res.status(201).json({

                    status: "success",
                    mensaje: "Usuario creado",
                    user: userSave
                })
                
            } catch (error) {

                return res.status(500).json({

                    status: "error",
                    mensaje: "Error del servidor al registrar el usuario",

                });

            }

        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al crear el usuario"

        })
        
    }

}

module.exports = registerUser;
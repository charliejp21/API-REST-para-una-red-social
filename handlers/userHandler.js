const {registerUserDb, duplicatedUserDb, loginFind, findUserById, listUsersDb, userToUpdateDuplicated, updateUser, saveImgDb} = require('../controllers/userController');
const fs = require("fs")
const path = require("path")

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

            status: "error",
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

                status: "error",
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

        const findUser = await findUserById(id, req.user.id)

        if(findUser){

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

//listar usuarios
const listarUsuarios = async (req, res) => {

    let {page} = req.params;

    const ITEMS_PER_PAGE = 5;

    //Controlar en que pagina estamos
    if(!page){

        page = 1

    }else{

        page = parseInt(page)

    }

    try {

        const listUsers = await listUsersDb(page, ITEMS_PER_PAGE)

        if(listUsers.users.length){

            return res.status(200).json({

                status: "success",
                users: listUsers.users,
                page,
                ITEMS_PER_PAGE,
                total:listUsers.total,
                pages: Math.ceil(listUsers.total / ITEMS_PER_PAGE),

            })

        }else{

            return res.status(400).json({

                status: "error",
                message: "No hay usuarios para listar"
            })

        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            message: "Error del servidor al tratar de listar los usuarios"
        })
        
    }
}

//update bio
const updateBio = async(req, res) =>{

    const {name, subname, nick, email, password, bio} = req.body

    //Obtener info del usuario a actualizar
    //req.user viene del middleware creado
    let userToUpdate = req.user;

    //Eliminar campos sobrantes de req.user

    delete userToUpdate.iat;
    delete userToUpdate.exp; 
    delete userToUpdate.role;
    delete userToUpdate.imagen;
    
    //Comprobar si el usuario ya existe
     try {

        //Control de usuarios duplicados
        let duplicatedUser = await userToUpdateDuplicated(email, nick, userToUpdate.id);

        if(duplicatedUser && duplicatedUser.length >= 1){

            return res.status(400).send({

                status: "error",
                message: "El usuario ya existe"

            })

        }else{

            //Buscar y actualizar

            //Actualizar registro de usuario en la db
            const userUpdate = await updateUser(name, subname, nick, email, password, bio, userToUpdate.id)

            //Devolver el resultadado
            return res.status(201).json({

                status: "success",
                mensaje: "Usuario actualizado",
                usuario: userUpdate

            })


        }
        
    } catch (error) {
        
        return res.status(500).json({

            status: "error",
            mensaje: "Error del servidor al actualizar el usuario"

        })
        
    }

}

//subir archivos y actualizar el campo 
const uploadContentUser = async (req, res) => {

    //Recoger el  fichero de la imagen  y comprobar que existe
    if(!req.file){

        return res.status(404).json({

            status: "error", 
            mensaje: "No se ha proporcionado la imagen del avatar"

        })
    }

    //Conseguir el nombre del archivo
    let imgAvatar = req.file.originalname;

    //Sacar la extension del archivo
    let imageSplit = imgAvatar.split(".");
    let extension = imageSplit.at(-1);

    //Comprobar extrension
    if(extension !== "png" && extension !== "jpg" && extension !== "jpeg" && extension !== "gif"){

        //Si no es el correcto, borrar archivo 
        const filePath = req.file.path;

        fs.unlinkSync(filePath)

        return res.status(400).json({

            status: "error", 
            mensaje: "Por favor sube un formato de imagen válido"
        })

    }

    // Si es el correcto guardar imagen en la bd
    try {

        const saveImage = await saveImgDb(req.user.id, req.file.filename)

        if(saveImage){

            return res.status(201).json({

                status: "success", 
                mensaje: "Imagen actualizada exitosamente", 
                user: saveImage,
                file: req.file
            })

        }

    } catch (error) {

        return res.status(500).json({

            status: "error", 
            mensaje: "Error del servidor al actualizar la imagen del avatar"
        })
        
    }

}

const showImgAvatar = async (req, res) => {

    //Sacar el párametro solicitado de la url 
    const {file} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/avatars/" + file;

    //Comprobar que exsiste
    //.stat sirve para virificar si hay un archivo en el servidor
    fs.stat(filePath, (error, exists) =>{

        if(!exists){

            return res.status(400).json({

                status: "error", 
                mensaje: "Imagen no encontrada"
            })

        }else{
            //Devolver el file
            //path es una libreria de node js que permite mandar un path absoluto o fisico en la respuesta
            //path.resolve consigue una rusta absoluta de la ruta física que se le pase
            return res.sendFile(path.resolve(filePath))
        }

    })        


}
module.exports = {registerUser, loginUser, miCuenta, miPerfil, listarUsuarios, updateBio, uploadContentUser, showImgAvatar};
const {newFollowedController, removeUnfollowController} = require("../controllers/followController")

const saveFollow = async(req, res) => {

    //Conseguir datos del body(¿A qué usuario voy a seguir?)
    const {followed} = req.body;
    
    //Sacar id del usuario identificado
    const {id} = req.user;

    //Crear objeto con modelo follow en el controller
    //Guardar objeto en bd- - Mandar al controller

    try {

        const newFollwed = await newFollowedController(id, followed);

        return res.status(200).json({

            status: "success",
            mensaje: "ruta save follow", 
            user: req.user,
            followed: newFollwed,
            userId: id

        })

    } catch (error) {

        return res.status(500).json({

           status: "error",
           error: "Error del servidor al seguir al usuario"

        })
        
    }
    
}

const deleteFollow = async(req, res) => {

    //recoger el id del usuario identificado
    const {id} = req.user;

    //recoger el usuario que se dejará de seguir
    const idUnfollow = req.params.id;

    try {

    //Find de las coincidencias y ejecuctar un remove
    const removeUnfollow = await removeUnfollowController(id, idUnfollow)

    return res.status(200).json({

        status: "success", 
        unFollow: removeUnfollow,
        mensaje: "Se ha dejado de seguir al usuario exitosamente",

    })
        
    } catch (error) {

        return res.status(500).json({

            status: "error", 
            mensaje: "Error del servidor al remover el follow"
        })

        
    }

}

module.exports = {saveFollow, deleteFollow}
const {newFollowedController, removeUnfollowController, findFollowController, listUsersFollowingController, listMyFollwersController} = require("../controllers/followController")

const saveFollow = async(req, res) => {

    //Conseguir datos del body(¿A qué usuario voy a seguir?)
    const {followed} = req.body;
    
    //Sacar id del usuario identificado
    const {id} = req.user;

    try {

        //Buscar follow en la bd
        //Crear objeto con modelo follow en el controller
        //Guardar objeto en bd- - Mandar al controller

        const findFollow = await findFollowController(id, followed)

        if(findFollow.length){

            return res.status(400).json({

                status: "error",
                mensaje: "Ya se encuentra el follow registrado en la base de datos"
    
            })

        }
        
        const newFollwed = await newFollowedController(id, followed);

        if(newFollwed){

            return res.status(200).json({

                status: "success",
                mensaje: "Se ha registrado el follow exitosamente"
    
            })

        }
        

    } catch (error) {

        return res.status(500).json({

           status: "error",
           error: "Error del servidor al registrar el follow"

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

//Accion listado de usuarios a los que sigue el usuario(siguiendo)
const followingUsersHandler = async (req, res) => {

    //Sacar el id del usuario identificado
    let idUser = req.user.id;

    //comprobar si me llga el id por parametro en url
    const {id} = req.params;

    if(id) idUser = id;
 
    //Comprobar si me llega la página, si no que se la página 1

    let pagination = 1;

    let {page} = req.params;

    if(page) {

        page = parseInt(page);

        pagination = page;

    }

    //-----Controller---/
    //Usuarios por página que quiero mostrar

    //Find and follow, también popular datos de los usuarios y paginar con mongoose paginate
    const listUsers = await listUsersFollowingController(idUser, pagination)

    if(!listUsers.results.length){
        
        return res.status(400).json({

            status: "error", 
            mensaje: "El usuario no sigue a ningun otro usuario"
    
        })

    }

    return res.status(200).json({

        status: "success", 
        mensaje: "Listado de usuarios que estoy siguiendo",
        followings: listUsers,

    })


}

//Accion listado de usuarios que siguen al usuario(mis seguidores) 
const myFollowersHandler = async (req, res) => {

     //Sacar el id del usuario identificado
     let idUser = req.user.id;

     //comprobar si me llga el id por parametro en url
     const {id} = req.params;
 
     if(id) idUser = id;
  
     //Comprobar si me llega la página, si no que se la página 1
 
     let pagination = 1;
 
     let {page} = req.params;
 
     if(page) {
 
         page = parseInt(page);
 
         pagination = page;
 
     }

     try {

        const listUsers = await listMyFollwersController(idUser, pagination)

        if(!listUsers.results.length){
            
            return res.status(400).json({
    
                status: "error", 
                mensaje: "El usuario no sigue a ningun otro usuario"
        
            })
    
        }
    
        return res.status(200).json({
    
            status: "success", 
            mensaje: "Listado de usuarios que son mis seguidores",
            followers: listUsers,
    
        })

        
     } catch (error) {

        return res.status(500).json({
 
            status: "error", 
            mensaje: "Error del servidor al obtener los seguidores",
    
        })
        
     }

    
}

module.exports = {saveFollow, deleteFollow, followingUsersHandler, myFollowersHandler}
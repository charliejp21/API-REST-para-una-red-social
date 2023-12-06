const {savePublicationController, getPublicationContoller, deletePublicationController, listPublicationsController} = require("../controllers/publicationController")
//Guardar publicación
const savePublicationHandler = async(req, res) => {

    if(!req.body.text){

        return res.status(401).json({

            status: "error",
            mensaje: "Falta el campo texto por enviar en la publicación"
            
        })
    }

    try {

        const savePublicationDb = await savePublicationController(req.body, req.user.id)

        if(savePublicationDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Publicacion creada exitosamente",
                publicacion: savePublicationDb
                
            })
        } 
        
    } catch (error) {

        return res.status(401).json({

            status: "error",
            mensaje: "Error al crear la publicación debido a que no se ha encontrado el id del usuario proporcionado",
            
        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al crear la publicación",
        
    })

}

//Obtener una publicación
const getPublicationHandler = async(req, res) => {

    const {id} = req.params;

    if(!id){

        return res.status(401).json({

            status: "error",
            mensaje: "Falta el id de la publicación por enviar",
            
        })
        

    }

    try {

        const getPublicationDb = await getPublicationContoller(id);
        
        if(getPublicationDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Publicacion encontrada exitosamente",
                publicacion: getPublicationDb
                
            })
        } 
        
    } catch (error) {

        return res.status(401).json({

            status: "error",
            mensaje: "No se ha encontrado la publicación con el id proporcionado",
            
        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al buscar la publicación",
        
    })

}

const deletePublicationHandler = async(req, res) => {

    const {id} = req.params;

    if(!id){

        return res.status(401).json({

            status: "error",
            mensaje: "Falta el id de la publicación que será borrada",
            
        })
        

    }

    try {

        const deletePublicationDb = await deletePublicationController(id, req.user.id);
        
        if(deletePublicationDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Publicacion borrada exitosamente",
                publicacion: deletePublicationDb
                
            })
        } 
        
    } catch (error) {

        return res.status(401).json({

            status: "error",
            mensaje: "No se ha encontrado la publicación con el id proporcionado",
            
        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al borrar la publicación",
        
    })

}

//Listar todas las publicaciones
const getPublicationsHandler = async(req, res) => {

    const {userId} = req.params;

    let page = 1; 

    if(req.params.page){

        page = parseInt(req.params.page)

    }

    try {

        const listPublicationsDb = await listPublicationsController(userId, page);
        
        if(listPublicationsDb){

            return res.status(200).json({

                status: "success",
                mensaje: "Información sobre publicaciones encontrada exitsamente",
                publicaciones: listPublicationsDb
                
            })
        } 
        
    } catch (error) {

        return res.status(401).json({

            status: "error",
            mensaje: "No se ha encontrado información sobre publicaciones para el usuario actual",
            
        })
        
    }

    return res.status(500).json({

        status: "error",
        mensaje: "Error del servidor al obtener la información de las publicaciones",
        
    })

}



module.exports = {savePublicationHandler,getPublicationHandler, deletePublicationHandler, getPublicationsHandler};
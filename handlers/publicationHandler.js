const {savePublicationController, getPublicationContoller} = require("../controllers/publicationController")
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
            mensaje: "Falta el di de la publicación por enviar",
            
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

//Eliminar una publicación

//Listar todas las publicaciones

//Subir ficheros

//Devolver archivos multimedia 

module.exports = {savePublicationHandler,getPublicationHandler};
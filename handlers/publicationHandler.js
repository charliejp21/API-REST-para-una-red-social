const savePublicationController = require("../controllers/publicationController")
//Guardar publicación
const savePublicationHandler = async(req, res) => {

    if(!req.body.text){

        return res.status(401).send({

            status: "error",
            mensaje: "Falta el campo texto por enviar en la publicación"
            
        })
    }

    try {

        const savePublicationDb = await savePublicationController(req.body, req.user.id)

        if(savePublicationDb){

            return res.status(200).send({

                status: "success",
                mensaje: "Publicacion creada exitosamente",
                publicacion: savePublicationDb
                
            })
        } 
        
    } catch (error) {

        return res.status(401).send({

            status: "error",
            mensaje: "Error al crear la publicación debido a que no se ha encontrado el id del usuario proporcionado",
            
        })
        
    }

    return res.status(500).send({

        status: "error",
        mensaje: "Error del servidor al crear la publicación",
        
    })

    

}

//Obtener una publicación

//Eliminar una publicación

//Listar todas las publicaciones

//Subir ficheros

//Devolver archivos multimedia 

module.exports = {savePublicationHandler};
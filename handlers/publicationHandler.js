const {savePublicationController, getPublicationContoller, deletePublicationController, listPublicationsController, uploadImgPublicationController, feedPublicationsController} = require("../controllers/publicationController")
const fs = require("fs")
const path = require("path")

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

const uploadImgPublicationHandler = async(req, res) => {

    //Sacar publication id
    const {idPublication} = req.params;

    if(!idPublication){

        return res.status(404).json({

            status: "error", 
            mensaje: "No se ha proporcionado el id de la publicación"

        })
    }


    //Recoger el  fichero de la imagen  y comprobar que existe
    if(!req.file){

        return res.status(404).json({

            status: "error", 
            mensaje: "No se ha proporcionado la imagen de la publicación"

        })
    }

    //Conseguir el nombre del archivo
    let imgPublication = req.file.originalname;

    //Sacar la extension del archivo
    let imageSplit = imgPublication.split(".");
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

        const saveImage = await uploadImgPublicationController(req.user.id, req.file.filename, idPublication)

        if(saveImage){

            return res.status(201).json({

                status: "success", 
                mensaje: "Imagen actualizada exitosamente", 
                publication: saveImage,
                file: req.file
            })

        }

    } catch (error) {

        //Si no es el correcto, borrar archivo 
        const filePath = req.file.path;

        fs.unlinkSync(filePath)

        return res.status(401).json({

            status: "error", 
            mensaje: "No se ha encontrado el id del usuario proporcionado"
        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor al actualizar la imagen de la publicación"
    })

}

const getImagePublicationHandler = async(req, res) => {

    //Sacar el párametro solicitado de la url 
    const {nameImage} = req.params;

    //Montar el path real de la imagen
    const filePath = "./uploads/publications/" + nameImage;

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

const feedPublicationsHandler = async(req, res) => {

    //Obtener página actual
    let {page} = req.params;

    //Controlar en que pagina estamos
    if(!page){

        page = 1

    }else{

        page = parseInt(page)

    }

    //Establecer número de elementos por página 
    
    //Sacar un array de identificadores de usuarios que yo sigo como usuario logeado
    
    //Find a publicaciones in, ordenar, popular y paginar
    try {

        const feedPublicationsDb = await feedPublicationsController(page, req.user.id)

        if(feedPublicationsDb){

            return res.status(200).json({

                status: "success", 
                mensaje: "Se ha obtenido el feed de publicaciones exitosamente",
                feed: feedPublicationsDb
            })
        }
        
    } catch (error) {

        return res.status(400).json({

            status: "error", 
            mensaje: "No se han encontrado publicaciones para mostrar en el feed"

        })
        
    }

    return res.status(500).json({

        status: "error", 
        mensaje: "Error del servidor para mostrar publicaciones del feed"
        
    })

}

module.exports = {

    savePublicationHandler,
    getPublicationHandler, 
    deletePublicationHandler, 
    getPublicationsHandler, 
    uploadImgPublicationHandler, 
    getImagePublicationHandler, 
    feedPublicationsHandler
    
};
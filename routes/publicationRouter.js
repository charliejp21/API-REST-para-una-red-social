const {Router} = require('express');
const {savePublicationHandler, getPublicationHandler,deletePublicationHandler, getPublicationsHandler, uploadImgPublicationHandler, getImagePublicationHandler} = require('../handlers/publicationHandler')
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const publicationRoutes = Router();


const storage = multer.diskStorage({

    destination: (req, res, cb) => {

        cb(null, "./uploads/publications")
    },
    filename:(req, file, cb) =>{

        cb(null, "publication-image-" + Date.now() + "-" + file.originalname)

    }
})

const uploads = multer({storage});

publicationRoutes.post("/save/", auth, savePublicationHandler)
publicationRoutes.get("/detail/:id", auth, getPublicationHandler)
publicationRoutes.delete("/id/:id", auth, deletePublicationHandler)
publicationRoutes.get("/user/:userId/:page?", auth, getPublicationsHandler)
publicationRoutes.put("/upload-img/:idPublication", [auth, uploads.single("file0")], uploadImgPublicationHandler)
publicationRoutes.get("/image/:nameImage", auth, getImagePublicationHandler)

module.exports = publicationRoutes;
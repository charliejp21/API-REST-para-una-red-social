const {Router} = require('express');
const {savePublicationHandler, getPublicationHandler,deletePublicationHandler} = require('../handlers/publicationHandler')
const {auth} = require("../middlewares/auth")

const publicationRoutes = Router();

publicationRoutes.post("/save/", auth, savePublicationHandler)
publicationRoutes.get("/detail/:id", auth, getPublicationHandler)
publicationRoutes.delete("/id/:id", auth, deletePublicationHandler)

module.exports = publicationRoutes;
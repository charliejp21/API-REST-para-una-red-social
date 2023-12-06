const {Router} = require('express');
const {savePublicationHandler, getPublicationHandler} = require('../handlers/publicationHandler')
const {auth} = require("../middlewares/auth")

const publicationRoutes = Router();

publicationRoutes.post("/save/", auth, savePublicationHandler)
publicationRoutes.get("/detail/:id", auth, getPublicationHandler)

module.exports = publicationRoutes;
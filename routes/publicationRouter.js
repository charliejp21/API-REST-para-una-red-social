const {Router} = require('express');
const {savePublicationHandler} = require('../handlers/publicationHandler')
const {auth} = require("../middlewares/auth")

const publicationRoutes = Router();

publicationRoutes.post("/save/", auth, savePublicationHandler)

module.exports = publicationRoutes;
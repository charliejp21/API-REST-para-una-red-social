const {Router} = require('express');
const {savePublicationHandler} = require('../handlers/publicationHandler')

const publicationRoutes = Router();

publicationRoutes.get("/", savePublicationHandler);

module.exports = publicationRoutes;
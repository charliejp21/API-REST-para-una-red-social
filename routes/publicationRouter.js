const {Router} = require('express');
const pruebaPublication = require('../handlers/publicationHandler')

const publicationRoutes = Router();

publicationRoutes.get("/", pruebaPublication);

module.exports = publicationRoutes;
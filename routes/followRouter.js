const {Router} = require('express')
const pruebaFollow = require("../handlers/followHandler")

const followRoutes = Router();

followRoutes.get("/", pruebaFollow)

module.exports = followRoutes;
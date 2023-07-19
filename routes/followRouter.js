const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveFollow, deleteFollow} = require("../handlers/followHandler")

const followRoutes = Router();

followRoutes.post("/save", auth, saveFollow)
followRoutes.delete("/delete/:id", auth, deleteFollow)

module.exports = followRoutes;
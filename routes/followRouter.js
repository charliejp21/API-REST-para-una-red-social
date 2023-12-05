const {Router} = require('express');
const {auth} = require("../middlewares/auth")
const {saveFollow, deleteFollow,  followingUsersHandler, myFollowersHandler} = require("../handlers/followHandler")

const followRoutes = Router();

followRoutes.post("/save", auth, saveFollow)
followRoutes.delete("/delete/:id", auth, deleteFollow)
//id será opcional por si pasan otro id, sino se toma el del usuario identificado, lo mismo con page
followRoutes.get("/myfollowers/:id?/:page?", auth, myFollowersHandler)
followRoutes.get("/users-follow/:id?/:page?", auth, followingUsersHandler)

module.exports = followRoutes;
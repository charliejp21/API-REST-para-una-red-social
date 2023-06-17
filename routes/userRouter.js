const {Router} = require('express');
const {registerUser, loginUser, miCuenta, miPerfil} = require('../handlers/userHandler')
const authMiddle = require("../middlewares/auth")

const userRoutes = Router();

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/mi-cuenta", authMiddle.auth, miCuenta)
userRoutes.get("/mi-perfil/:id", authMiddle.auth, miPerfil)

module.exports = userRoutes;
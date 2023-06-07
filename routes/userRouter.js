const {Router} = require('express');
const {pruebaUser, registerUser} = require('../handlers/userHandler')

const userRoutes = Router();

userRoutes.get("/prueba-usuario", pruebaUser)
userRoutes.post("/register", registerUser)

module.exports = userRoutes;
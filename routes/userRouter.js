const {Router} = require('express');
const {registerUser, loginUser} = require('../handlers/userHandler')

const userRoutes = Router();

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)

module.exports = userRoutes;
const {Router} = require('express');
const registerUser = require('../handlers/userHandler')

const userRoutes = Router();

userRoutes.post("/register", registerUser)

module.exports = userRoutes;
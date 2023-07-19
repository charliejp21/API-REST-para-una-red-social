const {Router} = require('express');
const {registerUser, loginUser, miCuenta, miPerfil, listarUsuarios, updateBio, uploadContentUser, showImgAvatar} = require('../handlers/userHandler')
const {auth} = require("../middlewares/auth")
const multer = require("multer")
const userRoutes = Router();

const storage = multer.diskStorage({

    destination: (req, res, cb) => {

        cb(null, "./uploads/avatars")
    },
    filename:(req, file, cb) =>{

        cb(null, "avatar-" + Date.now() + "-" + file.originalname)

    }
})

const uploads = multer({storage});

userRoutes.post("/register", registerUser)
userRoutes.post("/login", loginUser)
userRoutes.get("/mi-cuenta", auth, miCuenta)
userRoutes.get("/mi-perfil/:id", auth, miPerfil)
userRoutes.get("/usuarios/:page?", auth, listarUsuarios)
userRoutes.put("/actualizar", auth, updateBio)
//file0 es el nombre del field html por el cual se recibe el archivo
userRoutes.post("/upload", [auth, uploads.single("file0")], uploadContentUser)
userRoutes.get("/avatar/:file", auth, showImgAvatar)

module.exports = userRoutes;
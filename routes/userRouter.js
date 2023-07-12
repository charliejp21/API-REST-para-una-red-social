const {Router} = require('express');
const {registerUser, loginUser, miCuenta, miPerfil, listarUsuarios, updateBio, uploadContentUser, showImgAvatar} = require('../handlers/userHandler')
const authMiddle = require("../middlewares/auth")
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
userRoutes.get("/mi-cuenta", authMiddle.auth, miCuenta)
userRoutes.get("/mi-perfil/:id", authMiddle.auth, miPerfil)
userRoutes.get("/usuarios/:page?", authMiddle.auth, listarUsuarios)
userRoutes.put("/actualizar", authMiddle.auth, updateBio)
//file0 es el nombre del field html por el cual se recibe el archivo
userRoutes.post("/upload", [authMiddle.auth, uploads.single("file0")], uploadContentUser)
userRoutes.get("/avatar/:file", authMiddle.auth, showImgAvatar)

module.exports = userRoutes;
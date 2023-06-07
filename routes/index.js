const {Router} = require('express');
const userRouter = require("./userRouter");
const publicationRouter = require("./publicationRouter")
const followRouter = require("./followRouter")

//Importar todos los routers
const router = Router();

//Configurar los routers
router.use('/user', userRouter);
router.use("/publication", publicationRouter);
router.use('/follow', followRouter)

module.exports = router;
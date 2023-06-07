const pruebaPublication = (req, res) => {

    return res.status(200).send({

        message: "Mensaje de prueba"
    })

}

module.exports = pruebaPublication;
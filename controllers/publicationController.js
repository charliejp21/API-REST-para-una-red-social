const Publication = require("../models/Publication")

const savePublicationController = async(data, userId) => {

    const newPublication = new Publication(data)

    newPublication.user = userId;

    return newPublication.save()

}

const getPublicationContoller = async(id) => {

    return await Publication.findById(id)

}

module.exports  = {savePublicationController, getPublicationContoller}
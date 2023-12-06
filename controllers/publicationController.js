const Publication = require("../models/Publication")

const savePublicationController = async(data, userId) => {

    const newPublication = new Publication(data)

    newPublication.user = userId;

    return newPublication.save()

}

module.exports  = savePublicationController
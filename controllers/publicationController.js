const Publication = require("../models/Publication")

const savePublicationController = async(data, userId) => {

    const newPublication = new Publication(data)

    newPublication.user = userId;

    return newPublication.save()

}

const getPublicationContoller = async(id) => {

    return await Publication.findById(id)

}

const deletePublicationController = async(id, userId) => {

    return await Publication.findOneAndDelete({

        user: userId,
        _id: id
        
    })
}

const listPublicationsController = async(userId, page) => {

    const itemsPerPage = 5;

    let findPublications = await Publication.paginate(

        { user: userId },
        {
            page: page,
            limit: itemsPerPage,
            populate: {
                path: "user",
                select: "-password -role -__v"
             }
         }

    )

   const results = findPublications.docs;
   const total = findPublications.totalDocs;
   const pages = Math.ceil(total/itemsPerPage)

   return { total, pages, results};

}

const uploadImgPublicationController = async(idUser, imgFilename, idPublication) => {

    if(idUser && imgFilename && idPublication){

        return await Publication.findOneAndUpdate(

            { "_id": idPublication },
            { $set: { 
                user: idUser, 
                file: imgFilename 
            } }, // Utiliza $set para actualizar múltiples campos
            { new: true }

        )

    }

}

module.exports  = {savePublicationController, getPublicationContoller, deletePublicationController, listPublicationsController, uploadImgPublicationController}
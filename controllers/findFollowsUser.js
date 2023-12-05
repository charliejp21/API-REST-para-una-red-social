const Follow = require("../models/Follow")

const findFollowsUser = async(id) => {

    return await Follow.find({

        "user": id
        //"followed" : 1, para que solo muestre la propiedad followed 
    })
    .select({"followed":1, "_id":0})
    .exec()
    .then(follows => follows)
    .catch(error => {

        throw error

    })
    
    //Listado de followers en comun
    let followUserIds = followService.followUserIds(req.user.id)

    return {

        user_following: 
    }

}

module.exports = findFollowsUser;

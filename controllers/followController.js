const Follow = require("../models/Follow")

const findFollowController = async(id, followed) => {

    return await Follow.find({

        user: id,
        followed: followed

    })
   

}
const newFollowedController = async (id, followed) => {

    const objFollowed = new Follow({

        user: id,
        followed: followed

    });

    return await objFollowed.save()
    
}

const removeUnfollowController = async (id, idUnfollow) => {
    
    return await Follow.findOneAndDelete({

        user: id,
        followed: idUnfollow

    })
    .then(followedDelated => followedDelated)
    .catch(error => {
        
        throw error
    })

}

module.exports = {newFollowedController, removeUnfollowController, findFollowController};

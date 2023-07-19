const Follow = require("../models/Follow")

const newFollowedController = async (id, followed) => {

    const objFollowed = new Follow({

        user: id,
        followed: followed

    });

    return await objFollowed.save()

    .then (FollowedSucces => FollowedSucces)
    .catch (error => {

        throw error;
    })

}

const removeUnfollowController = async (id, idUnfollow) => {
    
    return await Follow.find({

        "user": id, 
        "followed": idUnfollow

    })
    .then(followedStored => followedStored)
    .catch(error => {
        
        throw error
    })

}

module.exports = {newFollowedController, removeUnfollowController};

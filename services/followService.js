const Follow = require("../models/Follow");
const followUserIds = async (identityUserId) => {

  const following = await Follow.find({

    user: identityUserId,
    //"followed" : 1, para que solo muestre la propiedad followed
  })
    .select({ followed: 1, _id: 0 })
    .exec();

  //Listado de followers en comun

  const followers = await Follow.find({

    followed: identityUserId,
    //"followed" : 1, para que solo muestre la propiedad followed
  })
    .select({ user: 1, _id: 0 })
    .exec();

  let followingClean = [];

  following.forEach((follow) => {

    followingClean.push(follow.followed)

  })

  let followersClean = [];

  followers.forEach((follow) => {

    followersClean.push(follow.user)

  })

  return {
    following: followingClean,
    followers: followersClean,
  };
};

const followThisUser = async (identityUserId, profileUserId) => {
  const following = await Follow.findOne({

    user: identityUserId,
    followed: profileUserId
  })
  //Listado de followers en comun

  const follower = await Follow.findOne({

    user: profileUserId,
    followed: identityUserId
  })

  return {

    following,
    follower
  }
  
};

module.exports = { followUserIds, followThisUser };

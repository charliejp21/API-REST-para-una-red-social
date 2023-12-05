const findFollowsUser = require("../controllers/findFollowsUser");
const followUserIdes = async (identityUserId) => {

  let following = await findFollowsUser(identityUserId);

  let followers = false;

  return {
    following,
    followers,
  };
};

const followThisUser = async (identityUserId, profileUserId) => {
  let followers;
};

module.exports = { followUserIdes, followThisUser };

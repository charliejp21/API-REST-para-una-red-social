const Follow = require("../models/Follow");
const followService = require("../services/followService");

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

const listUsersFollowingController = async(idUser, pagination) => {

    const ITEMS_PER_PAGE = 5;

     // Usa el método paginate proporcionado por el plugin.
    let findFollowers = await Follow.paginate(

            { user: idUser },
            {
                page: pagination,
                limit: ITEMS_PER_PAGE,
                populate: {
                    path: "user followed",
                    select: "-password -role -__v -email"
            }
        }
    //Se utiliza para cargar los datos completos de los usuarios relacionados en los campos user y followed dentro de los documentos de la colección follows. 
  );
        
    const followUserIds = await followService.followUserIds(idUser)
    const results = findFollowers.docs;
    const total = findFollowers.totalDocs;
    const pages = Math.ceil(total/ITEMS_PER_PAGE)

    return { results, total, pages, followUserIds };
    
}

const listMyFollwersController = async(idUser, pagination) => {

    const ITEMS_PER_PAGE = 5;

    // Usa el método paginate proporcionado por el plugin.
   let findFollowers = await Follow.paginate(

           { followed: idUser },
           {
               page: pagination,
               limit: ITEMS_PER_PAGE,
               populate: {
                   path: "user followed",
                   select: "-password -role -__v -email"
                }
            }
   //Se utiliza para cargar los datos completos de los usuarios relacionados en los campos user y followed dentro de los documentos de la colección follows. 
 );
   const results = findFollowers.docs;
   const total = findFollowers.totalDocs;
   const pages = Math.ceil(total/ITEMS_PER_PAGE)

   return { results, total, pages };
}

module.exports = {newFollowedController, removeUnfollowController, findFollowController, listUsersFollowingController, listMyFollwersController};
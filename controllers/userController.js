const User = require("../models/User")
const Follow = require("../models/Follow")
const Publication = require("../models/Publication")
const bcrypt = require('bcrypt')
const followService = require("../services/followService")
const registerUserDb = async (name, subname, nick, email, password) => {

    //Cifrar la contraseña (se utilza la librebreia bcrypt-nodejs)(el 10 son los cifrados sobre cifrados, es como el nivel de seguridad ne cifrado)
    const hashedPassword = await bcrypt.hash(password, 10)

    password = hashedPassword;

    const registerUser = new User({

        name, 
        subname,
        nick, 
        email, 
        password,

    })

    return registerUser.save();

}

const duplicatedUserDb = (email, nick) =>{

    if(email && nick){

        return User.find({ $or: [ // si un email existe o un nick name existe no se cumple la condicion, para eso funciona el $or
                
                {email: email.toLowerCase()},
                    
                {nick: nick.toLowerCase()} 
            
            ]}).exec()
        }


}

const loginFind = async(email, password) => {

    if(email && password){

         const findUser = await User.findOne({email: email})

         if(findUser){

            const pwdMatch = await bcrypt.compareSync(password, findUser.password) 

            if(pwdMatch){

                return findUser

            }

         }

    }

}

const findUserById = async(id, identityUserId) =>{

    const findUser = await User.findById(id).select({password:0, role:0})

    if(findUser){

        const followInfo = await followService.followThisUser(id,identityUserId)

        return {findUser, following: followInfo.following, follower: followInfo.follower}

    }

}

const listUsersDb = async(page, itemsPerPage) => {

    const options = {
        select: { password: 0, role: 0 , email:0, "__v":0},
        sort: '_id',
        page: page,
        limit: itemsPerPage
    };

    const findUsers = await User.paginate({}, options);

    const users = findUsers.docs;
    const total = findUsers.totalDocs;

    return { users, total };

}

const userToUpdateDuplicated = (email, nick, id) =>{

    if (email && nick) {

        return User.find({

          $or: [
            { email: email.toLowerCase() },
            { nick: nick.toLowerCase() }
          ]

        })
          .exec()
          .then(users => {

            //Si la concidencia encotrada por cada usuario es diferenete el id que hace se pushea a userIsset, si del usuario que se encuentra info es el mismo id al del que hace la peticion se retorna null ya que no hay nada que pushear y deja actualizar la info

            let userIsset = [];

            users.forEach(user => {

                if(user && user._id != id){

                    userIsset.push(user._id);

                }
                
            });

            if(userIsset.length > 0){

                return userIsset

            }
    
            return null; // Si no hay usuarios duplicados

        })

      }
    
}

const updateUser = async(name, subname, nick, email, password, bio, id) => {

    //Si me llega la password cifrarla
    let hashedPassword;

    if(password){

        hashedPassword = await bcrypt.hash(password, 10)

        password = hashedPassword;

    }

   const userUpdated = await User.findByIdAndUpdate(
        id,
        {
            name,
            subname,
            nick,
            email,
            password,
            bio
        },
        {new:true}).select({password:0, role:0}) 
   //El tercero parametro {new:true} es para que se devuelvan los datos actualizados tras la consulta

   return userUpdated

}

const saveImgDb = async(id, imgPath) => {

    if(id && imgPath){

        return await User.findOneAndUpdate(

            {_id: id},
            {image: imgPath},
            {new: true}

        ).select({password:0, role:0})
        //.select para devolver datos del usuario sin la contraseña

    }

}

const countUsersController = async(idUser) => {

    const following = await Follow.count({"user" : idUser})

    const followed = await Follow.count({"followed": idUser})

    const publications = await Publication.count({"user": idUser})

    return{
        following: following, 
        followed: followed, 
        publications: publications
    }
}

module.exports = {
    registerUserDb,
    duplicatedUserDb, 
    loginFind, 
    findUserById, 
    listUsersDb,
    userToUpdateDuplicated, 
    updateUser, 
    saveImgDb, 
    countUsersController
};
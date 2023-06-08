const User = require("../models/User")

const registerUserDb = (name, subname, nick, email, password) => {

    const registerUser = new User({

        name, 
        subname,
        nick, 
        email, 
        password

    })

    return registerUser.save();

}

const duplicatedUserDb = (email, nick) =>{

    if(email && nick){

        return User.find({ $or: [ // si un email existe o un nick name existe no se cumple la condicion, para eso funciona el $or
            {email: email.toLowerCase()},
            {nick: nick.toLowerCase()} ]}).exec()
    }


}

module.exports = {registerUserDb,duplicatedUserDb};
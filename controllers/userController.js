const User = require("../models/User")
const bcrypt = require('bcrypt')

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

const findUserById = async(id) =>{

    const findUser = await User.findById(id).select({password:0, role:0})

    if(findUser){

        return findUser

    }

}

module.exports = {registerUserDb,duplicatedUserDb, loginFind, findUserById};
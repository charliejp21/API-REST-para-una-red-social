const User = require("../models/User")
const bcrypt = require('bcrypt')

const registerUserDb = async (name, subname, nick, email, password) => {

    //Cifrar la contraseña (se utilza la librebreia bcrypt-nodejs)(el 10 son los cifrados sobre cifrados, es como el nivel de seguridad ne cifrado)
    const hashedPassword = await bcrypt.hash(password, 10)

    const registerUser = new User({

        name, 
        subname,
        nick, 
        email, 
        hashedPassword,

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

const loginFind = (email, password) => {

    if(email && password){

         const findUser = User.findOne({email: email})

         const pwd = bcryptSync(password, findUser.password) 

         if(!pwd && !findUser){

            throw error;

         }

         
      return findUser;

    }
}

module.exports = {registerUserDb,duplicatedUserDb, loginFind};
const User = require("../models/User")

const registerUserDb = (name, subname, nick, email, password) => {

    const registerUser = new User({

        name: name, 
        subname: subname,
        nick: nick, 
        email: email, 
        password: password

    })

    return registerUser.save()

    .then(userRegistred => userRegistred)

    .catch(error => {

        throw error;
        
    })

}

module.exports = registerUserDb;
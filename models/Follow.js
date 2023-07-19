const {Schema, model} = require("mongoose");

const FollowSchema = Schema({

    user: {

        type: Schema.ObjectId,
        ref: "User"

    },
    followed: {

        type: Schema.ObjectId,
        ref: "User"
    }, 
    created_at: {

        type: Date,
        default: Date.now()

    }

})

//primer parametro: Como se llama la entidad. 
//Segundo param: Cual Shchema se va a usar. 
//Tercer param: El nombre de la coleccion
module.exports = model("Follow", FollowSchema, "follows")
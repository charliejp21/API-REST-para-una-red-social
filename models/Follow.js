const {Schema, model} = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

const FollowSchema = Schema({

    user: {

        type: Schema.ObjectId,
        ref: "User"

    },
    followed: {

        type: Schema.ObjectId,
        ref: "User",
    }, 
    created_at: {

        type: Date,
        default: Date.now()

    }

})

//primer parametro: Como se llama la entidad. 
//Segundo param: Cual Shchema se va a usar. 
//Tercer param: El nombre de la coleccion
FollowSchema.plugin(mongoosePaginate);
module.exports = model("Follow", FollowSchema, "follows")
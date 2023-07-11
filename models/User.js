const {Schema, model} = require("mongoose")
const mongoosePaginate = require('mongoose-paginate-v2');

const UserSchema = Schema({

    name: {

        type: String, 
        require: true
    }, 
    subname: {

        type: String,

    },
    nick:{
        type:String,
        require: true
    }, 
    email: {

        type: String,
        required: true,
    }, 
    password:{

        type: String, 
        require: true
    },
    role: {

        type: String, 
        default: "role_user"

    },
    image: {

        type: String, 
        default: "default.png"
    },
    bio: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now(),
    }

})

UserSchema.plugin(mongoosePaginate);

module.exports = model("User", UserSchema, "users")
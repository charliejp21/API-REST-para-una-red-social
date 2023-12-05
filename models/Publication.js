const {Schema, model} = require("mongoose")

const PublicationSchema = Schema({

    user:{

        type: Schema.Object.Id, 
        ref: "User"
        
    },
    text: {

        type: String,
        required: true,

    }, 
    file: String,
    created_at: {

        type: Date,
        default: Date.now

    }


});

module.exports = model("Publication", PublicationSchema, "publications")
const validator = require("validator")

const validate = (params) => {

    let nameValidate = !validator.isEmpty(params.name) && 
                        validator.isLength(params.name, {min:3, max: undefined}) && validator.isAlpha(params.name, "es-ES");

    let surnameValidate = !validator.isEmpty(params.subname) && 
    validator.isLength(params.subname, {min:3, max: undefined}) && validator.isAlpha(params.subname, "es-ES");

    let nickValidate = !validator.isEmpty(params.nick) && 
    validator.isLength(params.nick, {min:2, max: undefined});
    
    let emailValidate = !validator.isEmpty(params.email) && 
    validator.isEmail(params.email);

    let passwordValidate = !validator.isEmpty(params.password)

    if(params.bio){
        
        let bioValidate =  validator.isLength(params.bio, {min:undefined, max: 255});

        if(!bioValidate){

            throw new Error("No se ha superado la validación de la bio")
        }
    
    }

    if(!nameValidate || !surnameValidate || !nickValidate || !emailValidate || !passwordValidate){

        throw new Error("No se ha superado la validación")
    }



}

module.exports = validate;
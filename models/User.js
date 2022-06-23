const {Schema, model} = require('mongoose');

//TODO add validation

const NAME_PATTERN = /^[a-zA-Z-]+$/;
const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/
//TODO change user model according to exam description
const userSchema = new Schema({
    firstName:{type:String, required:true, minlenght:[3,'Fisrt name must be at least 3 characters long'], validate:{
        validator(value){
            return NAME_PATTERN.test(value)
        },
        message:'Fisrt name may contains only english letters'
    }},
    lastName:{type:String, required:true, minlenght:[5,'Last name must be at least 5 characters long'], validate:{
        validator(value){
            return NAME_PATTERN.test(value)
        },
        message:'Last name may contains only english letters'
    }},
    email:{type:String, required:[true,'Email is required!'],validate:{
        validator(value){
            return EMAIL_PATTERN.test(value)
        },
        message:'Email may contains only english letters'
    }},
    hashedPassword:{type:String,required: true},
});

userSchema.index({email: 1}, {
    unique: true,
    collation:{
        locale:'en',
        strength:2
    }
});

const User = model('User',userSchema);

module.exports = User;
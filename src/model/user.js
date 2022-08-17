const mongoose = require('mongoose')
const validator =  require("validator")
const bcrypt = require("bcrypt")
const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age:{
        type:Number,
        validate(value){
            if(value<0){
                throw new Error("age must be a possitive")
            }
        }
    }
})
 
UserSchema.pre('save', async function(next){
    user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})
const User = mongoose.model("User",UserSchema)
module.exports = User
const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName:{
        type: String,
    },
    lastName:{
        type: String,
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type: String,
        required: true
    },
    image:{
        type:String,
        default:null,
    },
    role: {
        type:String,
        default:'basic',
        enum:['basic','supervisor','admin']
    },

}, {timestamps: true})

module.exports = mongoose.model("User", userSchema)
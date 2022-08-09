const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    course_name:{
        type:String,
        required:true,
    },
    course_code:{
        type:String,
        required:true,
        unique:true,
    },
    course_dept:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required:true,
    
    },
    credit:{
        type:String,
        required:true,
    },

    course_instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }

},{timestamps:true})

module.exports = mongoose.model("Course", courseSchema)
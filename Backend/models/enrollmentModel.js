const mongoose = require('mongoose');

const enrollementSchema = mongoose.Schema({
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        require:"Each enrollment must have a department ",
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:"Student to be enrolled is required"
    },
    courses:[
        {
            type:Array,
            completed:false,
            
        },
    ],
    
    enrolled_at:{
        type: Date,
        default:Date.now()
    },
    

}, { timestamps: true })

module.exports = mongoose.model("Enrollment", enrollementSchema)
const mongoose = require('mongoose');

const enrollementSchema = mongoose.Schema({
    
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Course',
        required:true
    },

    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    
    enrolled_at:{
        type: Date,
        default:Date.now()
    },
    

}, { timestamps: true })

module.exports = mongoose.model("Enrollment", enrollementSchema)
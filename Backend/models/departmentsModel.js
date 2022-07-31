const mongoose = require('mongoose')

const departmentSchema = mongoose.Schema({
    dept_name: {
        type: String,
        require:true,
    },
    
}, {timestamps:true})

module.exports = mongoose.model('Department', departmentSchema)
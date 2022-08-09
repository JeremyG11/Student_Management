const dotenv = require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express');
const app = express();

const port = process.env.PORT

// middlewares
app.use(express.json())

// Attaching the appending routes for each endpoint
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/courses', require('./routes/courseRoutes'))
app.use('/api/department', require('./routes/deptRoutes'))
app.use('/api/enrollment', require('./routes/enrollmentRoutes'))
// Connect to mongodb atlas in the cloud
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(port, ()=> {
        console.log(`Server running on port: ${port}`)
    })
})
.catch( err =>{
    console.error(err)
})

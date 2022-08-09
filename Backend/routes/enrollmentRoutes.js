const express = require('express')
const router = express.Router()

router.post('/new/:course_ID', (req, res) =>{
    res.json({ message: 'That one is working'})
})

module.exports = router
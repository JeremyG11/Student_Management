const express = require('express')
const router = express.Router()

const { createDept } = require('../controllers/deptController')

router.post('/create', createDept)
module.exports = router
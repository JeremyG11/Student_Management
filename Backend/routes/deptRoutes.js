const express = require('express')
const router = express.Router()

const { createDept, getDepartments } = require('../controllers/deptController')

router.post('/create', createDept)
router.get('/:departmentId', getDepartments)
router.put('/update/dept_id',  )


module.exports = router
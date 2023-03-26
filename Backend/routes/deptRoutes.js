const express = require('express')
const router = express.Router()

const { departmentById } = require('../middlewares/departmentMiddleware')

const { createDept, getDepartments, updateDepartment, 
    deleteDepartment, getDepartment } = require('../controllers/deptController')

router.post('/create', createDept)
router.get('/', getDepartment)
router.get('/:departmentId', getDepartments)
router.put('/update/:dept_id', updateDepartment )
router.delete('/delete/:dept_id', deleteDepartment )

router.param('departmentId', departmentById)

module.exports = router
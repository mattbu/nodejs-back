const express = require('express')

const {register} = require('../controllers/usersController')
const {validateCreateUser} = require('../middleware/userValidation')

const validate = require('../middleware/validate')

const router = express.Router()

router.post('/', validateCreateUser, validate, register)

module.exports = router
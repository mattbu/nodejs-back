const express = require('express')

const {register, login} = require('../controllers/usersController')
const {validateCreateUser, validateLogin} = require('../middleware/userValidation')

const validate = require('../middleware/validate')

const router = express.Router()

router.post('/', validateCreateUser, validate, register)
router.post('/login', validateLogin, validate, login)

module.exports = router
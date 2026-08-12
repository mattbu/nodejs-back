const express = require('express')
const router = express.Router()

const ADMIN = 'ADMIN'

const { validateCreateUser, validateLogin } = require('../middleware/userValidation')

const authMiddleware = require('../middleware/authMiddleware')
const roleMiddleware = require('../middleware/roleMiddleware')
const validate = require('../middleware/validate')

const {
    register,
    login,
    getUsers
} = require('../controllers/usersController')

router.post('/', validateCreateUser, validate, register)
router.post('/login', validateLogin, validate, login)
router.get('/', authMiddleware, roleMiddleware(ADMIN), getUsers)

module.exports = router
const express = require('express')
const router = express.Router()

const { refresh, logout } = require('../controllers/refreshTokenController')
const { login } = require('../controllers/usersController')

const { validateLogin } = require('../middleware/userValidation')

const authMiddleware = require('../middleware/authMiddleware')
const validate = require('../middleware/validate')

router.post('/login', validateLogin, validate, login)
router.post('/refresh', refresh)
router.post('/logout', logout)

module.exports = router
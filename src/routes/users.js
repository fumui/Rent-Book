const express = require('express')
const route = express.Router()

const userController = require('../controllers/users')
const auth = require('../middlewares/auth')

route
    .get('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getAllUsers)
    .get('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getAllUsers)
    .post('/register', userController.registerUser)
    .post('/login', userController.login)

module.exports = route
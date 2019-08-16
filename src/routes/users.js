const express = require('express')
const route = express.Router()

const userController = require('../controllers/users')
const auth = require('../middlewares/auth')

route
    .get('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getAllUsers)
    .get('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getOneUser)
    .post('/register', userController.registerUser)
    .post('/register/admin', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.registerAdmin)
    .post('/login', userController.login)

module.exports = route
const express = require('express')
const route = express.Router()

const auth = require('../middlewares/auth')
const userController = require('../controllers/users')

route
  .get('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getAllUsers)
  .get('/profile',auth.verifyTokenMiddleware, userController.getUserProfile)
  .get('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.getOneUser)
  .post('/register/admin', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, userController.registerAdmin)
  .post('/register', userController.registerUser)
  .post('/login', userController.login)

module.exports = route

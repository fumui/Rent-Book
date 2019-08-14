const express = require('express')
const route = express.Router()

const userController = require('../controllers/users')

route
    .post('/register', userController.registerUser)
    .post('/login', userController.login)
    module.exports = route
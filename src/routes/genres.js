const express = require('express')
const route = express.Router()

const genreController = require('../controllers/genres')
const userController = require('../controllers/users')

route
    .post('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, genreController.insertGenres)
    .get('/', genreController.getAllGenres)
    .get('/:id', genreController.getOneGenre)
    .patch('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, genreController.updateGenres)
    .delete('/', userController.verifyTokenMiddleware, userController.verifyAdminPrevilege, genreController.deleteGenres)
    module.exports = route
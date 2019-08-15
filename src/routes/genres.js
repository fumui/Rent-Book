const express = require('express')
const route = express.Router()

const genreController = require('../controllers/genres')
const userController = require('../controllers/users')

route
    .post('/', userController.verifyTokenMiddleware, genreController.insertGenres)
    .get('/', genreController.getAllGenres)
    .get('/:id', genreController.getOneGenre)
    .patch('/', userController.verifyTokenMiddleware, genreController.updateGenres)
    .delete('/', userController.verifyTokenMiddleware, genreController.deleteGenres)
    module.exports = route
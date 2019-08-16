const express = require('express')
const route = express.Router()

const genreController = require('../controllers/genres')
const auth = require('../middlewares/auth')

route
    .post('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, genreController.insertGenres)
    .get('/', genreController.getAllGenres)
    .get('/:id', genreController.getOneGenre)
    .patch('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, genreController.updateGenres)
    .delete('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, genreController.deleteGenres)
    
module.exports = route
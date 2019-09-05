const express = require('express')
const route = express.Router()
const multerUploads = require('../middlewares/multer').multerUploads

const bookController = require('../controllers/books')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, multerUploads, bookController.insertBook)
  .get('/', bookController.getAllBook)
  .get('/total/', bookController.getTotalBooks)
  .get('/newest/', bookController.getNewestBooks)
  .get('/year/', bookController.getBookYears)
  .get('/genre/', bookController.getBookGenres)
  .get('/year/:year', bookController.getBookByYear)
  .get('/genre/:genre', bookController.getBookByGenre)
  .get('/:id', bookController.getOneBook)
  .patch('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, multerUploads, bookController.updateBook)
  .delete('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.deleteBook)

module.exports = route

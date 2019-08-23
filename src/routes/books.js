const express = require('express')
const route = express.Router()

const bookController = require('../controllers/books')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.insertBook)
  .get('/', bookController.getAllBook)
  .get('/total/', bookController.getTotalBooks)
  .get('/popular/', bookController.getBooksByPopularity)
  .get('/year/', bookController.getBookYears)
  .get('/year/:year', bookController.getBookByYear)
  .get('/genre/:genre', bookController.getBookByGenre)
  .get('/:id', bookController.getOneBook)
  .patch('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.updateBook)
  .delete('/:id', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, bookController.deleteBook)

module.exports = route

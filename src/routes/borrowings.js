const express = require('express')
const route = express.Router()

const borrowingController = require('../controllers/borrowings')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, borrowingController.insertBorrowing)
  .get('/', auth.verifyTokenMiddleware, borrowingController.getAllBorrowing)
  .get('/history/', auth.verifyTokenMiddleware, borrowingController.getBorrowingsHistory)
  .get('/book/:id', auth.verifyTokenMiddleware, borrowingController.getLatestBorrowingByBookId)
  .get('/:id', auth.verifyTokenMiddleware, borrowingController.getOneBorrowing)
  .patch('/', auth.verifyTokenMiddleware, borrowingController.returningBook)
  .delete('/:id', auth.verifyTokenMiddleware, borrowingController.deleteBorrowing)

module.exports = route

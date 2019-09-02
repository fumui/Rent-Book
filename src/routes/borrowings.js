const express = require('express')
const route = express.Router()

const borrowingController = require('../controllers/borrowings')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, borrowingController.requestBorrowing)
  .get('/', auth.verifyTokenMiddleware, borrowingController.getAllBorrowing)
  .get('/requests', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, borrowingController.getBorrowingRequests)
  .get('/history/', auth.verifyTokenMiddleware, borrowingController.getBorrowingsHistory)
  .get('/book/:id', auth.verifyTokenMiddleware, borrowingController.getLatestBorrowingByBookId)
  .get('/:id', auth.verifyTokenMiddleware, borrowingController.getOneBorrowing)
  .patch('/confirm', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, borrowingController.confirmBorrowing)
  .patch('/', auth.verifyTokenMiddleware, auth.verifyAdminPrevilege, borrowingController.returningBook)
  .delete('/:id', auth.verifyTokenMiddleware, borrowingController.deleteBorrowing)

module.exports = route

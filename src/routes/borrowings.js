const express = require('express')
const route = express.Router()

const borrowingController = require('../controllers/borrowings')
const auth = require('../middlewares/auth')

route
  .post('/', auth.verifyTokenMiddleware, borrowingController.insertBorrowing)
  .get('/', auth.verifyTokenMiddleware, borrowingController.getAllBorrowing)
  .get('/:id', auth.verifyTokenMiddleware, borrowingController.getOneBorrowing)
  .patch('/:id', auth.verifyTokenMiddleware, borrowingController.returningBook)
  .delete('/:id', auth.verifyTokenMiddleware, borrowingController.deleteBorrowing)

module.exports = route

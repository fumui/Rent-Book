const express = require('express')
const route = express.Router()

const borrowingController = require('../controllers/borrowings')

route
    .post('/', borrowingController.insertBorrowing)
    .get('/', borrowingController.getAllBorrowing)
    .patch('/', borrowingController.returningBook)
    .delete('/', borrowingController.deleteBorrowing)
    module.exports = route
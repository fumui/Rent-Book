const modelBorrowings = require('../models/borrowings')
module.exports = {
  insertBorrowing: (req, res) => {
    const borrowingData = {
      user_id: req.user_id,
      book_id: req.body.book_id,
      borrowed_at: new Date()
    }
    const modelBook = require('../models/books')
    modelBook.getAvailability(borrowingData.book_id)
      .then(result => {
        if (result[0].availability === 1) {
          return Promise.all([
            modelBorrowings.insertBorrowing(borrowingData),
            modelBook.setAvailability(borrowingData.book_id, 0)
          ])
        } else {
          res.json({ message: 'Book not available yet!' })
        }
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
      .then(result => res.json(result))
  },
  getAllBorrowing: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const bookStatus = req.query.book_status
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const start = (Number(page) - 1) * limit

    modelBorrowings.getAllBorrowing(keyword, sort, bookStatus, start, limit)
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Borrowing data not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  getOneBorrowing: (req, res) => {
    const id = req.params.id
    modelBorrowings.getOneBorrowing(id)
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Borrowing data not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  returningBook: (req, res) => {
    const data = {
      book_id: req.body.book_id,
      returned_at: new Date()
    }
    modelBorrowings.getLatestBorrowingByBookId(data.book_id)
      .then(result => {
        if (result.length !== 0) {
          return Promise.all([
            modelBorrowings.returningBook(result[0].id, data),
            require('../models/books').setAvailability(data.book_id, 1)
          ])
        } else {
          return res.json({ message: 'Book already been returned' })
        }
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
      .then(result => res.json(result))
  },
  deleteBorrowing: (req, res) => {
    const id = req.body.id

    modelBorrowings.deleteBorrowing(id)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  }
}

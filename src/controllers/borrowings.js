const modelBorrowings = require('../models/borrowings')

module.exports = {
    insertBorrowing : (req, res)=>{
        const borrowingData = {
            book_id: req.body.book_id,
            borrowed_at: new Date(),
        }
        
        modelBorrowings.insertBorrowing(borrowingData)
            .then(
                result => require('../models/books')
                    .setAvailability(borrowingData.book_id, 0)
            )
            .catch(err => console.error(err))
            .then(result => res.json(result))
    },
    getAllBorrowing : (req, res)=>{
        modelBorrowings.getAllBorrowing()
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    getOneBorrowing : (req, res)=>{
        id = req.params.id
        modelBorrowings.getOneBorrowing(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    returningBook : (req, res) => {
        const id = req.body.id
        const data = {
            book_id: req.body.book_id,
            returned_at: new Date(),
        }

        modelBorrowings.returningBook(id, data)
            .then(
                result => require('../models/books')
                    .setAvailability(data.book_id, 1)
            )
            .catch(err => console.error(err))
            .then(result => res.json(result))
    },
    deleteBorrowing : (req, res) => {
        const id = req.body.id

        modelBorrowings.deleteBorrowing(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }
}
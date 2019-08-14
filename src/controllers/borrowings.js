const modelBorrowings = require('../models/borrowings')

module.exports = {
    insertBorrowing : (req, res)=>{
        const borrowingData = {
            book_id: req.body.book_id,
            borrowed_at: new Date(),
        }
        const modelBook = require('../models/books')
        modelBook.getAvailability(borrowingData.book_id)
            .then(result => {
                if(result[0].availability == "1"){
                    return Promise.all([
                        modelBorrowings.insertBorrowing(borrowingData),
                        modelBook.setAvailability(borrowingData.book_id, 0)
                    ])
                }else{
                    res.json({message : "Book not available yet!"})
                }
            })
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
        const data = {
            book_id: req.body.book_id,
            returned_at: new Date(),
        }
        modelBorrowings.getLatestBorrowingByBookId(data.book_id)
            .then(result => Promise.all([
                modelBorrowings.returningBook(result[0].id, data),
                require('../models/books').setAvailability(data.book_id, 1)
            ]))
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
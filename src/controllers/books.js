const modelBooks = require('../models/books')

module.exports = {
    insertBook : (req, res)=>{
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            genre_id: req.body.genre_id,
            availability: true,
            created_at: new Date(),
            Updated_at: new Date(),
        }

        modelBooks.insertBook(data)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    getAllBook : (req, res)=>{
        const sort = req.query.sortby;
        const availability = req.query.availability;
        const page = req.query.page || 1
        const limit = req.query.limit || 10
        const start = (Number(page) - 1) * limit 
        
        modelBooks.getAllBook(sort, availability, start, limit)
            .then(result => res.json(result))
            .catch(err => console.error(err))
        
    },
    searchBooksByTitle : (req, res)=>{
        const keyword = req.params.keyword
        modelBooks.searchBooksByTitle(keyword)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    getOneBook : (req, res)=>{
        id = req.params.id
        modelBooks.getOneBook(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    updateBook : (req, res) => {
        const id = req.body.id
        const data = {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image,
            date_released: req.body.date_released,
            genre_id: req.body.genre_id,
            availability: true,
            Updated_at: new Date(),
        }

        modelBooks.updateBook(id, data)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    deleteBook : (req, res) => {
        const id = req.body.id

        modelBooks.deleteBook(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }
}
const modelBooks = require('../models/books')

module.exports = {
  insertBook: (req, res) => {
    const data = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date_released: req.body.date_released,
      genre_id: req.body.genre_id,
      availability: true,
      created_at: new Date(),
      Updated_at: new Date()
    }

    modelBooks.insertBook(data)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  getAllBook: (req, res) => {
    const keyword = req.query.search
    const sort = req.query.sortby
    const availability = req.query.availability
    const page = req.query.page || 1
    const limit = req.query.limit || 10
    const start = (Number(page) - 1) * limit

    modelBooks.getAllBook(keyword, sort, availability, start, limit)
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Book not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  getOneBook: (req, res) => {
    const id = req.params.id
    modelBooks.getOneBook(id)
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Book not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  updateBook: (req, res) => {
    const id = req.body.id
    const data = {
      title: req.body.title,
      description: req.body.description,
      image: req.body.image,
      date_released: req.body.date_released,
      genre_id: req.body.genre_id,
      Updated_at: new Date()
    }

    modelBooks.updateBook(id, data)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  deleteBook: (req, res) => {
    const id = req.body.id

    modelBooks.deleteBook(id)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  }
}

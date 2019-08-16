const modelGenres = require('../models/genres')

module.exports = {
  insertGenres: (req, res) => {
    const data = {
      name: req.body.name
    }

    modelGenres.insertGenre(data)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  getAllGenres: (req, res) => {
    modelGenres.getAllGenre()
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Genre not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  getOneGenre: (req, res) => {
    const id = req.params.id
    modelGenres.getOneGenre(id)
      .then(result => {
        if (result.length !== 0) return res.json(result)
        else return res.json({ message: 'Genre not found' })
      })
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  updateGenres: (req, res) => {
    const id = req.body.id
    const data = {
      name: req.body.name
    }

    modelGenres.updateGenre(id, data)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  },
  deleteGenres: (req, res) => {
    const id = req.body.id

    modelGenres.deleteGenre(id)
      .then(result => res.json(result))
      .catch(err => {
        console.error(err)
        return res.sendStatus(500)
      })
  }
}

const modelGenres = require('../models/genres')

module.exports = {
    insertGenres : (req, res)=>{
        const data = {
            name : req.body.name
        }

        modelGenres.insertGenre(data)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    getAllGenres : (req, res)=>{
        modelGenres.getAllGenre()
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    getOneGenre : (req, res)=>{
        id = req.params.id
        modelGenres.getOneGenre(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    updateGenres : (req, res) => {
        const id = req.body.id
        const data = {
            name : req.body.name
        }

        modelGenres.updateGenre(id, data)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    },
    deleteGenres : (req, res) => {
        const id = req.body.id

        modelGenres.deleteGenre(id)
            .then(result => res.json(result))
            .catch(err => console.error(err))
    }
}
const conn = require('../configs/db')

module.exports = {
    insertBook: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT books SET ?', data, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getAllBook: (sort = null, availability = null, start, limit) => {
        return new Promise((resolve, reject) => {

            let query = 'SELECT * FROM books '
            if(availability != null)
                query += `WHERE availability = ${availability} `
            if(sort != null)
                query += `ORDER BY ${sort} `

            conn.query(query +`LIMIT ${start}, ${limit}`, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    searchBooksByTitle: (keyword) => {
        return new Promise((resolve, reject) => {
            const patterns = `%${keyword}%`
            console.log(patterns)
            conn.query('SELECT * FROM books WHERE title LIKE ?', patterns, (err, result) =>{
                if(err) 
                    reject(err)
                else {
                    resolve(result)
                }
            })
        })
    },
    getOneBook: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM books WHERE id = ?', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    updateBook: (id, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE books SET ? WHERE id = ?', [data, id], (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    setAvailability: (id, availability) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE books SET availability = ? where id = ?', [availability, id], (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getAvailability: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT availability FROM books WHERE id = ?', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    deleteBook: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM books WHERE id = ?', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    }
}
const conn = require('../configs/db')

module.exports = {
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT books SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllBook: (keyword = null, sort = null, availability = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM books_list '

      const availabilityIsNotNull = availability != null
      const keywordIsNotNull = keyword != null

      if (availabilityIsNotNull || keywordIsNotNull) {
        query += `WHERE `
        query += availabilityIsNotNull ? `availability = ${availability} ` : ``
        query += availabilityIsNotNull && keywordIsNotNull ? `AND ` : ``
        query += keywordIsNotNull ? `title LIKE '%${keyword}%' ` : ''
      }

      query += sort != null ? `ORDER BY ${sort} ` : ''

      conn.query(query + `LIMIT ${start}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM books WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  updateBook: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET ? WHERE id = ?', [data, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  setAvailability: (id, availability) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE books SET availability = ? where id = ?', [availability, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAvailability: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT availability FROM books WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteBook: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM books WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}

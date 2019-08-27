const conn = require('../configs/db')

module.exports = {
  insertBook: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT books SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllBook: (keyword = null, sort = "title", availability = null, start, limit) => {
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
      conn.query('SELECT * FROM books_list WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getTotalBooks: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT `TABLE_ROWS` AS total FROM `INFORMATION_SCHEMA`.`TABLES` WHERE `TABLE_SCHEMA` = "rent-book" AND `TABLE_NAME` = "books"', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookYears: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT YEAR(date_released) AS year FROM books_list GROUP BY year', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBooksByPopularity: () => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT books.id, books.title, books.image, books.availability, COUNT(book_id) AS popularity FROM `borrowings` JOIN books ON books.id = book_id WHERE books.availability = 1 GROUP BY book_id ORDER BY popularity DESC LIMIT 5', (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByYear: (year) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM books_list WHERE YEAR(date_released) = ${year}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getBookByGenre: (genre) => {
    return new Promise((resolve, reject) => {
      conn.query(`SELECT * FROM books_list WHERE genre = ?`, genre, (err, result) => {
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

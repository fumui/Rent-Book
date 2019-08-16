const conn = require('../configs/db')

module.exports = {
  insertBorrowing: (data) => {
    return new Promise((resolve, reject) => {
      conn.query('INSERT borrowings SET ?', data, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getAllBorrowing: (keyword = null, sort = null, bookStatus = null, start, limit) => {
    return new Promise((resolve, reject) => {
      let query = 'SELECT * FROM borrowings_list '

      const bookStatusIsNotNull = bookStatus != null
      const keywordIsNotNull = keyword != null

      if (bookStatusIsNotNull || keywordIsNotNull) {
        query += `WHERE `
        query += bookStatusIsNotNull ? `returned_at IS ` : ``
        query += bookStatusIsNotNull && bookStatus === 'returned' ? 'NOT NULL ' : 'NULL '
        query += bookStatusIsNotNull && keywordIsNotNull ? `AND ` : ``
        query += keywordIsNotNull ? `title LIKE '%${keyword}%' ` : ''
      }

      if (sort != null) { query += `ORDER BY ${sort} ` }
      console.log(query)
      conn.query(query + `LIMIT ${start}, ${limit}`, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getOneBorrowing: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM borrowings_list WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  getLatestBorrowingByBookId: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('SELECT * FROM borrowings WHERE book_id = ? AND returned_at IS NULL', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  returningBook: (id, data) => {
    return new Promise((resolve, reject) => {
      conn.query('UPDATE borrowings SET ? where id = ?', [data, id], (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  },
  deleteBorrowing: (id) => {
    return new Promise((resolve, reject) => {
      conn.query('DELETE FROM borrowings WHERE id = ?', id, (err, result) => {
        if (err) { reject(err) } else { resolve(result) }
      })
    })
  }
}

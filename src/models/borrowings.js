const conn = require('../configs/db')

module.exports = {
    insertBorrowing: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT borrowings SET ?', data, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getAllBorrowing: () => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM borrowings', (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getOneBorrowing: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM borrowings WHERE id = ?', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getLatestBorrowingByBookId: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM borrowings WHERE book_id = ? AND returned_at IS NULL', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    returningBook: (id, data) => {
        return new Promise((resolve, reject) => {
            conn.query('UPDATE borrowings SET ? where id = ?', [data, id], (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    deleteBorrowing: (id) => {
        return new Promise((resolve, reject) => {
            conn.query('DELETE FROM borrowings WHERE id = ?', id, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    }
}
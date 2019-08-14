const conn = require('../configs/db')

module.exports = {
    registerUser: (data) => {
        return new Promise((resolve, reject) => {
            conn.query('INSERT users SET ?', data, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    login: (email, password) => {
        return new Promise((resolve, reject) => {
            conn.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    },
    getAllUsersWithEmailOrUsername: (email, username) => {
        return new Promise((resolve, reject) => {
            conn.query(`SELECT * FROM users WHERE email = '${email}' OR username = '${username}'`, (err, result) =>{
                if(err) 
                    reject(err)
                else 
                    resolve(result)
            })
        })
    }
}
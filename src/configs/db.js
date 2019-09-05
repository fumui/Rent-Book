require('dotenv').config()

const mysql = require('mysql')
const conn = mysql.createConnection({
  host: process.env.DB_REMOTE_HOST,
  user: process.env.DB_REMOTE_USER,
  password: process.env.DB_REMOTE_PASSWORD,
  database: process.env.DB_REMOTE_NAME
})
module.exports =  conn
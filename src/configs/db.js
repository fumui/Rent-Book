require('dotenv').config()

const mysql = require('mysql')
const conn = mysql.createConnection({
  host: process.env.DB_LOCAL_HOST,
  user: process.env.DB_LOCAL_USER,
  password: process.env.DB_LOCAL_PASSWORD,
  database: process.env.DB_LOCAL_NAME
})
module.exports =  conn
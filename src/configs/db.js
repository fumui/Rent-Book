require('dotenv').config()

const mysql = require('mysql')
const conn = mysql.createConnection({
  host: process.env.DB_HOST || 'remotemysql.com:3306',
  user: process.env.DB_USER || 'XEEMQEoL6j',
  password: process.env.DB_PASSWORD || 'AZm2M6aluF',
  database: process.env.DB_NAME || 'XEEMQEoL6j'
})
const information_schema_conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'information_schema'
})
module.exports =  conn
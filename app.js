require('dotenv').config()

const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const cloudinaryConfig = require('./src/configs/cloudinaryConfig').cloudinaryConfig
const bookRoute = require('./src/routes/books')
const genreRoute = require('./src/routes/genres')
const borrowingRoute = require('./src/routes/borrowings')
const userRoute = require('./src/routes/users')

const PORT = process.env.PORT || 3306

app.use(cors())
app.use(express.static(path.resolve(__dirname, 'src/public')));
app.listen(PORT,'0.0.0.0', () => {
  console.log(`Server is running at PORT ${PORT}`)
})

app.use(logger('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: false }))
app.use('*', cloudinaryConfig);
app.use('/books', bookRoute)
app.use('/genres', genreRoute)
app.use('/borrowings', borrowingRoute)
app.use('/users', userRoute)

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// Import Routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')

// Dotenv
dotenv.config()

// Middlewares
app.use(express.json())

// Route Middlewares
app.use('/api/user', authRoute)
app.use('/api/posts', postRoute)

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true },
  () => {
    console.log('Connected to DB')
  }
)

// Run Server
app.listen(3005, () => {
  console.log('3005 Port Server Up and Running!')
})

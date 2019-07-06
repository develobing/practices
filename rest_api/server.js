require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const subscriberRouter = require('./routes/subscriber')
app.use('/subscriber', subscriberRouter)


app.get('/', (req, res) => {
  res.send('<h1>Index</h1>')
})
app.listen(3005, () => console.log('3005 Port Server Started!'))

const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()
const UserRoute = require('./routes/user.route.js')

app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT)

app.use("/user", UserRoute)

mongoose.connect(process.env.DATABASE_URL)
.then(() => {
  console.log('Connected to database! ')
  app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
  })
})
.catch(() => {
  console.error(`Can't connect to database!`)
})
const express = require('express')
const app = express()
const cors = require('cors');
const mongoose = require('mongoose')
require('dotenv').config()

const User = require('./models/user.model.js')

app.use(cors())
app.use(express.json())

const PORT = Number(process.env.PORT)

app.get("/user", async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
})

app.post("/user", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json(user);
  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

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
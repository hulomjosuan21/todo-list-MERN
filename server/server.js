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

app.post('/auth', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({username});

  if (user && user.password === password) {
    const { password, ...userWithoutPassword } = user.toObject();
    return res.status(200).json(userWithoutPassword);
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});

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
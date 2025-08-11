require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const verifyUser = require('./middlewares/verifyUser')
const app = express()

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionSuccessStatus: 200
  })
)

app.use(express.json())

app.use('/api/auth', require('./routes/authRoutes'))

// The venues route
app.use('/api/venues', verifyUser, require('./routes/venueRoutes'))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    app.get('/', (req, res) =>
      res.status(200).json({ status: 'Server running...' })
    )

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`)
    })
  })
  .catch(err => console.log(`MongoDB connection error: ${err}`))

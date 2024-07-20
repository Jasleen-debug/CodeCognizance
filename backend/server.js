//const express = require('express') - this is old way of importing ok
import express from 'express' // you need to go to package.json and add type = module
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/authRoutes.js'
import DBConnection from './database/db.js'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()
const PORT = process.env.PORT;

// Define the allowed origin
const allowedOrigin = 'http://localhost:5173';

// Apply CORS middleware
app.use(cors({
  origin: allowedOrigin,
  credentials: true
}));
// Parse JSON bodies
app.use(express.json())
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/auth', authRouter)
app.get('/', (req,res) => {
  res.send('Hello world')
})



// Connect to the database and start the server
DBConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
  })
}).catch((error) => {
    console.error('Failed to connect to the database:', error)
})




//const express = require('express') - this is old way of importing ok
import express from 'express' // you need to go to package.json and add type = module
import cors from 'cors'
import dotenv from 'dotenv'
import { authRouter } from './routes/auth.js'
import { problemRouter } from './routes/problems.js'
import { runRouter } from './routes/run.js'
import DBConnection from './database/db.js'
import cookieParser from 'cookie-parser'
import { judgeRouter } from './routes/judge.js'
import { submissionRouter } from './routes/submissions.js'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const app = express()
const PORT = process.env.PORT
const ORIGIN = process.env.ORIGIN

const corsOptions = {
  origin: ORIGIN || 'http://localhost:5173',
  credentials: true,
}

// Apply CORS middleware
app.use(cors(corsOptions))
// Parse JSON bodies
app.use(express.json())
// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use('/auth', authRouter)
app.use('/problems', problemRouter)
app.use('/submissions', submissionRouter)
app.use('/run', runRouter)
app.use('/judge', judgeRouter)
app.get('/', (req,res) => {
  res.send('Hello world')
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Serve static files from the Vite app's dist directory
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// Handle all other routes with the Vite app's entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'))
})

// Connect to the database and start the server
DBConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port :${PORT}`)
  })
}).catch((error) => {
    console.error('Failed to connect to the database:', error)
})




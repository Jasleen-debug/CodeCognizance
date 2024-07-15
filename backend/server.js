//const express = require('express') - this is old way of importing ok
import express from 'express' // you need to go to package.json and add type = module
import authRoutes from './routes/authRoutes'

const app = express()
const PORT = 3000;

app.use('/auth',authRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


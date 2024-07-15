//const express = require('express') - this is old way of importing ok
import express from 'express' // you need to go to package.json and add type = module
const app = express()
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello, world!')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})


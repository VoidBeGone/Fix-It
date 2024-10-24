require('dotenv').config()

const express = require('express')

// Create express app
const app = express()

app.get('/', (req, res) => {
    res.json({msg: 'Welcome to app'})
})

app.listen(process.env.PORT, () => {
    console.log("Listening on port", process.env.PORT)
})
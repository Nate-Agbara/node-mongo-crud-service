const express = require('express')
const bodyParser = require('body-parser')
app = express()

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/', require('./routes/hello'))



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Listening on Port: ${PORT}`)
})

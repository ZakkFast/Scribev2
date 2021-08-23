const express = require('express')

const app = express()

const PORT = process.env.PORT || 3005

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))

require('./routes/routes')(app)

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`)
})
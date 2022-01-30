const express = require('express')
const app = express()
const PORT = 3001

/* API take request from gateway and returns the requsted API response */
app.use(express.json())
app.get('/fakeapi', (req, res, next) => {
    res.send('Hello from fake api server')
})
app.post('/bogusapi', (req, res, next) => {
    res.send('Bogus api says hello!')
})

app.listen(PORT, () => {
    console.log('Fake server started on port ' + PORT)
})


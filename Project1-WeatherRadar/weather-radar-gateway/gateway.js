const express = require('express')
const app = express()
const routes = require('./routes')
const PORT = 3000
var cors = require('cors');

app.use(cors());
app.use(express.json())
app.use('/', routes)

/* initialize and start gateway server port */
app.listen(PORT, () => {
    console.log('Gateway has started on port ' + PORT)
})
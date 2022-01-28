const express = require('express')
const router = express.Router()
const axios = require('axios')

/* API endpoint returns requsted API response */
router.all('/:apiName', (req, res) => {
    console.log(req.params.apiName)
    /*res.send(req.params.apiName + '\n ')*/
    axios.get('http://localhost:3001/' + req.params.apiName).then((response) => {
        res.send(response.data)
    })
})

module.exports = router
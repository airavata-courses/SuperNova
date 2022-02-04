const express = require('express')
const router = express.Router()
const axios = require('axios')
const registry = require('./registry.json')
const fs = require('fs')

/* API endpoint returns requsted API response */
router.all('/:apiName/:path', (req, res) => {
    console.log(req.params.apiName)
    if(registry.services[req.params.apiName]){
        formattedPath = registry.services[req.params.apiName].url+ req.originalUrl;
        console.log('Path Routed:'+ formattedPath)
        axios({
            method: req.method,
            url: formattedPath,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            console.log('API SUCCESS RESPONSE:'+ formattedPath +':'+ response.data);
            res.send({'Content-Type':'image/gif'},response.data)
        },
        (error)=> {
            console.log('API ERROR RESPONSE:'+ formattedPath +':'+ error.error);
            res.send(error.error);
        })
    }else {
        res.send("API Name doesn't exist")
    }
})

router.post('/register', (req, res) => {
    const registrationInfo = req.body
    registry.services[registrationInfo.apiName] = { ...registrationInfo }
    console.log(JSON.stringify(registry))

    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (error) => {
        if(error){
            res.send("Could not register '" + registrationInfo.apiName + "'\n" + error)
        }else {
            res.send("Successfully registered '" + registrationInfo.apiName + "'")
        }
    })
})

module.exports = router
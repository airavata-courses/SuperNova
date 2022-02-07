const express = require('express');
const redis = require('redis');
const axios = require('axios');
var cors = require('cors');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5001;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

app.use(express.json())

async function getPlot(req, res, next) {
    try {
        axios({
            method: req.method,
            url: formattedPath,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            console.log('API SUCCESS RESPONSE:'+ formattedPath +':'+data);
            // Set data to Redis
            client.set(radar_id+date, JSON.stringify(data));
            console.log('Fetching Data...');
            res.send(data)
        },
        (error)=> {
            console.log('API ERROR RESPONSE:'+ formattedPath +':'+ error.error);
            res.send(error.error);
        })
    } catch (err) {
      console.error(err);
      res.status(500);
    }
}

// Cache middleware
function cache(req, res, next) {
    console.log(req.params.apiName)
    weatherApiUrl = 'http://localhost:8000'
    formattedPath = weatherApiUrl + req.originalUrl;
    console.log('Path Routed:'+ formattedPath)
    current_url = new URL(formattedPath);
    search_params = current_url.searchParams;
    console.log('parameters: ' + search_params)
    radar_id = search_params.get('radar_id');
    date = search_params.get('date');
    /* route to redis cache */
    client.get(radar_id+date, (err, data) => {
        if (err) {
            console.log("Error: ", err)
        }
    
        if (data !== null) {
            console.log("cached data ...")
            res.send(JSON.parse(data));
        }
        else {
            next();
        }
    });
}

// Weather data plot API 
app.get('/weatherApi/plot', cache, getPlot);

app.listen(PORT, () => {
    console.log(`Cache service listening on port ${PORT}`)
});


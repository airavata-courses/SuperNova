const express = require('express');
const redis = require('redis');
const axios = require('axios');
const cors = require('cors');
const url = require('url');
const QueryResponse = require('./query');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 5001;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);

app.use(express.json());

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

// Query Status API to show on dashboard
app.post('/weatherApi/querystatus', function(req, res){
    console.log("query status endpoint CONNECT");
    var jsonObj = req.body
    console.log("Input JSON: "+jsonObj);
  
    result = []
    for (var i = 0; i < jsonObj.length; i++){
        var obj = jsonObj[i];
        let redis_key = obj.radar_id + obj.date
        console.log(redis_key)
        client.get(redis_key, (err, data) => {
            if (err) {
                console.log("Error: ", err)
                //return res.sendStatus(500);
            }
        
            if (data !== null) {
                console.log("query found in cache ...");
                let output = new QueryResponse(
                    obj.radar_id,
                    obj.date,
                    'True'
                );
                console.log("element added in JSON: " + output);
                result.push(output);
            }else {
                console.log("query not found in cache ...");
                let output = new QueryResponse(
                    obj.radar_id,
                    obj.date,
                    'False'
                );
                console.log("element added in JSON: " + output);
                result.push(output);
            }
            //console.log("Response: "+ result)
            return res.send(result);
        })
    } 
})

app.listen(PORT, () => {
    console.log(`Cache service listening on port ${PORT}`)
});


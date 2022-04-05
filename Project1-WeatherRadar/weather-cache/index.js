const express = require('express');
const redis = require('redis');
const axios = require('axios');
const cors = require('cors');
const url = require('url');
const QueryResponse = require('./query');
const isEmpty = require('lodash.isempty');
const runProducer = require('./producer');
const runConsumerNexRAD = require('./consumer-nexrad');
const runConsumerMerra = require('./consumer-merra');

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4400;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient({ host:"weather-cache-redis", port:6379 });
//const client = redis.createClient(REDIS_PORT);
client.on("error", function (err) {
    console.log("ERR:REDIS: " + err);
});

app.disable('etag');
app.use(express.json());


function getPlot(req, res, next) {
    console.log('kafka getPlot backend call..');
    client.set(dataType+radar_id+date+'status', 'PROCESS_IN'); // weather plot status
    console.log(`redis PROCESS_IN status key parameters: ${dataType+radar_id+date}`);
    kafkaProducerSuccess = runProducer.kafkaCacheProducer(dataType, JSON.stringify({"dataType":dataType,"radar_id":radar_id,"date":date}));
    if (kafkaProducerSuccess = true) {
        return res.sendStatus(200);
    } else {
        RestGetPlot(req, res, next);
    } 
}


async function RestGetPlot(req, res, next) {
    try {
        console.log('getPlot backend call..');
        client.set(dataType+radar_id+date+'status', 'PROCESS_IN'); // weather plot status
        await axios({
            method: req.method,
            url: formattedPath,
            headers: req.headers,
            data: req.body
        }).then((response) => {
            console.log('API SUCCESS RESPONSE:'+ formattedPath +':'+response.data);
            // Set data to Redis
            client.set(dataType+radar_id+date, JSON.stringify(response.data)); // weather plot data
            setTimeout(()=>{
                console.log('timeout update');
                client.set(dataType+radar_id+date+'status', 'PROCESS_DONE'); // weather plot status
            }, 3000);
            console.log('Fetching Data...');
            return res.send(response.data);
        },
        (error)=> {
            console.log('API ERROR RESPONSE:'+ formattedPath +':'+ error.error);
            client.set(dataType+radar_id+date+'status', 'PROCESS_FAIL'); // weather plot status
            return res.send(error);
        })
    } catch (err) {
    console.error(err);
    return res.status(500);
    }
}   

// Cache middleware
function cache(req, res, next) {
    console.log("Cache:",req.params.apiName)
    //weatherApiUrl = 'http://localhost:4600'
    if (req.params.apiName = 'weatherApi') {
        ApiUrl='http://weather-radar-api-app:4600';
        //ApiUrl='localhost:4600';
    } else if (req.params.apiName = 'merraApi') {
        ApiUrl='http://merra-api-app:4800';
        //ApiUrl='localhost:4800';
    }
    
    formattedPath = ApiUrl + req.originalUrl;
    console.log('Path Routed:'+ formattedPath)
    current_url = new URL(formattedPath);
    search_params = current_url.searchParams;
    console.log('parameters: ' + search_params)
    dataType = search_params.get('dataType'); 
    radar_id = search_params.get('radar_id');
    date = search_params.get('date');
    /* route to redis cache */
    client.get(dataType+radar_id+date, (err, data) => {
        if (err) {
            console.log("Error: ", err)
        }
    
        if (data !== null) {
            console.log("cached data ...")
            return res.send(JSON.parse(data));
        }
        else {
            next();
        }
    });
}

// NexRAD API for weather data plot  
app.get('/weatherApi/plot', cache, getPlot);

// Merra-2 API for weather data plot  
app.get('/merraApi/plot', cache, getPlot);

// Weather Cache Build Info
app.get('/weatherCache/buildinfo', function(req, res){
    return res.send('weather-cache-00');
});

// Query Status API to show on dashboard
app.post('/weatherApi/querystatus', function(req, res){
    console.log("query status endpoint CONNECT");
    let jsonObj = req.body
    console.log("Input JSON: "+jsonObj);
    if(isEmpty(jsonObj) || jsonObj.length === undefined) {
        return res.sendStatus(200);
    }
    result = []
    for (let i = 0; i < jsonObj.length; i++){
        let obj = jsonObj[i];
        let redis_key = obj.dataType + obj.radStation + obj.date + "status";
        console.log(redis_key)
        client.get(redis_key, (err, data) => {
            if (err) {
                console.log("Error: ", err)
                return res.sendStatus(500);
            }
        
            if (data === 'PROCESS_DONE') {
                console.log("PROCESS_DONE");
                let output = new QueryResponse(
                    obj.id,
                    obj.userID,
                    obj.radStation,
                    obj.sessionTime,
                    obj.date,
                    obj.dataType,
                    'PROCESS_DONE'
                );
                console.log("element added in JSON: " + output);
                result.push(output);
            }else if (data === 'PROCESS_IN') {
                console.log("PROCESS_IN");
                let output = new QueryResponse(
                    obj.id,
                    obj.userID,
                    obj.radStation,
                    obj.sessionTime,
                    obj.date,
                    obj.dataType,
                    'PROCESS_IN'
                );
                console.log("element added in JSON: " + output);
                result.push(output);
            } else {
                console.log("PROCESS_FAIL");
                let output = new QueryResponse(
                    obj.id,
                    obj.userID,
                    obj.radStation,
                    obj.sessionTime,
                    obj.date,
                    obj.dataType,
                    'PROCESS_FAIL'
                );
                console.log("element added in JSON: " + output);
                result.push(output);
            }

            if(i == jsonObj.length-1) {
                return res.send(result); 
            }            
        })
    }
})

app.listen(PORT, () => {
    console.log(`Cache service listening on port ${PORT}`)
    runConsumerNexRAD.kafkaCacheConsumerNexRAD();//NexRAD consumer continously listening from Kafka Broker
    runConsumerMerra.kafkaCacheConsumerMerra();//Merra-2 consumer continously listening from Kafka Broker
});


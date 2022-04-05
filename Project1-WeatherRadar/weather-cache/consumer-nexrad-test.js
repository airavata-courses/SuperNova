const {Kafka} = require("kafkajs");
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

//const client = redis.createClient({ host:"weather-cache-redis", port:6379 });
const client = redis.createClient(REDIS_PORT);
client.on("error", function (err) {
    console.log("ERR:REDIS NexRAD Consumer: " + err);
});

kafkaCacheConsumerNexRAD();
async function kafkaCacheConsumerNexRAD(){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "weatherCacheClient",
            "brokers" :["localhost:9092"]
        })

        //creating the consumer
        const consumer = kafka.consumer({groupId: 'nexrad_incoming_group'})
        console.log("NexRAD Consumer Connecting.....")
        await consumer.connect()
        console.log("NexRAD Consumer Connected!")

        //Subscribing to topics
        await consumer.subscribe({
            "topic": "nexrad_incoming",
            "fromBeginning": true
        })
        
        //consumer run logic to receive messages
        await consumer.run({
            "eachMessage": async result => {
                try {
                    //console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`)
                    console.log(`NexRAD Consumer RVD Msg ${result.message.value}`)
                    //console.log('API SUCCESS RESPONSE:'+ formattedPath +':'+response.data);
                    // data_type + radar_id + date + status + plot_data
                    let getPlotResponse = result.message.value.toString().split(',');
                    console.log(getPlotResponse);

                    // Set data to Redis
                    // data_type + radar_id + date + status + plot_data
                    //client.set(dataType+radar_id+date, JSON.stringify(response.data)); // weather plot data                    
                    //client.set(getPlotResponse[0]+getPlotResponse[1]+getPlotResponse[2], getPlotResponse[4]); // weather plot data
                    //setTimeout(()=>{
                      //  console.log('timeout update');
                        // data_type + radar_id + date + status + plot_data
                        //client.set(dataType+radar_id+date+'status', 'PROCESS_DONE'); // weather plot status
                        //client.set(getPlotResponse[0]+getPlotResponse[1]+getPlotResponse[2]+'status', getPlotResponse[3]); // weather plot status
                    //}, 3000);
                } catch (e) {
                    //console.log('API ERROR RESPONSE:'+ formattedPath +':'+ error.error);
                    //client.set(NexRADResponse.data_type+NexRADResponse.radar_id+NexRADResponse.date+'status', 'PROCESS_FAIL'); // weather plot status
                    console.log('kafka NexRAD Consumer unable to handle incoming message', e)
                }
            },
        })
        
    }
    catch(ex)
    {
        console.error(`kafka NexRAD Consumer exception ${ex}`)
    }
    finally{

    }

}

//module.exports = { kafkaCacheConsumerNexRAD }
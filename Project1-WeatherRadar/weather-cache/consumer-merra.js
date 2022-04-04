const {Kafka} = require("kafkajs");
const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

//const client = redis.createClient({ host:"weather-cache-redis", port:6379 });
const client = redis.createClient(REDIS_PORT);
client.on("error", function (err) {
    console.log("ERR:REDIS: " + err);
});

//kafkaCacheConsumerNexRAD();
async function kafkaCacheConsumerMerra(){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "MerraClient",
            "brokers" :["kafka-0.kafka-headless.space-dev.svc.cluster.local:9092"]
        })

        //creating the consumer
        const consumer = kafka.consumer({groupId: 'merra_outgoing_group'})
        console.log("Consumer Merra Connecting.....")
        await consumer.connect()
        console.log("Consumer Merra Connected!")

        //Subscribing to topics
        await consumer.subscribe({
            "topic": "merra_outgoing",
            "fromBeginning": true
        })
        
        //consumer run logic to receive messages
        await consumer.run({
            "eachMessage": async result => {
                try {
                    //console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`)
                    console.log(`Merra Message Consumed RVD Msg ${result.message.value}`)
                    //console.log('API SUCCESS RESPONSE:'+ formattedPath +':'+response.data);
                    // data_type + radar_id + date + status + plot_data
                    let getPlotResponse = result.message.value.toString().split(',');
                    console.log(getPlotResponse);

                    // Set data to Redis
                    if (getPlotResponse[0] = 'Merra-2') {
                        // data_type + radar_id + date + status + plot_data
                        //client.set(dataType+radar_id+date, JSON.stringify(response.data)); // weather plot data                    
                        client.set(getPlotResponse[0]+getPlotResponse[1]+getPlotResponse[2], getPlotResponse[4]); // weather plot data
                        // data_type + radar_id + date + status + plot_data
                        //client.set(dataType+radar_id+date+'status', 'PROCESS_DONE'); // weather plot status
                        client.set(getPlotResponse[0]+getPlotResponse[1]+getPlotResponse[2]+'status', getPlotResponse[3]); // weather plot status
                    } else {
                        console.log("Redis reject due to DataType mismatch for Merra consumer");
                    }
                } catch (e) {
                    //console.log('API ERROR RESPONSE:'+ formattedPath +':'+ error.error);
                    //client.set(NexRADResponse.data_type+NexRADResponse.radar_id+NexRADResponse.date+'status', 'PROCESS_FAIL'); // weather plot status
                    console.log('Merra consumer unable to handle incoming message', e)
                }
            },
        })
        
    }
    catch(ex)
    {
        console.error(`kafka Merra consumer exception ${ex}`)
    }
    finally{

    }

}

module.exports = { kafkaCacheConsumerMerra }
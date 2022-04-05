const {Kafka} = require("kafkajs");

async function kafkaCacheProducer(dataType, msg){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "weatherCacheClient",
            "brokers" :["kafka-0.kafka-headless.space-dev.svc.cluster.local:9092"]
        })

        //producer interface
        const producer = kafka.producer();
        console.log("Weather Cache Producer Connecting.....")
        await producer.connect()
        console.log("Weather Cache Producer Connected!")

        //producer send object with topic and messages having partitions of radar names A-M 0, N-Z 1
        console.log(`Weather Cache Producer dataType: ${dataType}`);
        if (dataType === 'NexRAD') {
            topic = 'nexrad_incoming'
        } else if (dataType === 'Merra-2') {
            topic = 'merra_incoming'
        }
        
        console.log(`topic: ${topic}`)
        //producer send object with topic and messages
        const result =  await producer.send({
            "topic": topic,
            "messages": [
                {
                    "value": msg
                }
            ]
        })
        console.log(`Weather Cache Producer request Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
        return true
    }
    catch(ex)
    {
        console.error(`Weather Cache Producer: Something bad happened ${ex}`)
        return false
    }
    finally{
        //process.exit(0);
    }
};

module.exports = { kafkaCacheProducer }

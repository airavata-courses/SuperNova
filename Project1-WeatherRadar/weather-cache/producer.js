const {Kafka} = require("kafkajs")

async function kafkaCacheProducer(dataType, msg){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "weatherCacheClient",
            "brokers" :["localhost:9092"]
        })

        //producer interface
        const producer = kafka.producer();
        console.log("Producer Cache Connecting.....")
        await producer.connect()
        console.log("Producer Cache Connected!")

        //producer send object with topic and messages having partitions of radar names A-M 0, N-Z 1
        if (dataType = 'NexRAD') {
            topic = 'nexrad_incoming'
        } else if (dataType = 'Merra-2') {
            topic = 'merra_incoming'
        }

        //producer send object with topic and messages
        const result =  await producer.send({
            "topic": topic,
            "messages": [
                {
                    "value": msg
                }
            ]
        })
        console.log(`Producer Cache request Send Successfully! ${JSON.stringify(result)}`)
        await producer.disconnect();
        return true
    }
    catch(ex)
    {
        console.error(`Producer Cache: Something bad happened ${ex}`)
        return false
    }
    finally{
        //process.exit(0);
    }
};

module.exports = { kafkaCacheProducer }

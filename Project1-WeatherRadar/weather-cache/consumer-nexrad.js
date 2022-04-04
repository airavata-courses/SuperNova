const {Kafka} = require("kafkajs");


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
        const consumer = kafka.consumer({groupId: 'test'})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")

        //Subscribing to topics
        await consumer.subscribe({
            "topic": "nexrad",
            "fromBeginning": true
        })
        
        //consumer run logic to receive messages
        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD Msg ${result.message.value}`)
            }
        })
        
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{

    }

}
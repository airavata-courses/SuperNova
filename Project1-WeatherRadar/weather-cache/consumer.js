const {Kafka} = require("kafkajs")

run();
async function run(){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers" :["localhost:9092"]
        })

        //creating the consumer
        const consumer = kafka.consumer({groupId: 'test'})
        console.log("Connecting.....")
        await consumer.connect()
        console.log("Connected!")
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{

    }

}
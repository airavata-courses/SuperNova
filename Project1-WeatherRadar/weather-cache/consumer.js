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

        //Subscribing to topics
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })
        
        //consumer run logic to receive messages
        await consumer.run({
            "eachMessage": async result => {
                console.log(`RVD Msg ${result.message.value} on partition ${result.partition}`)
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
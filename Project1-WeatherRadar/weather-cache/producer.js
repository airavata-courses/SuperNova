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

        //producer interface
        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")

        console.log("Created Successfully!")
        await producer.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }


}
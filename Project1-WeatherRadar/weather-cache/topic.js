const {Kafka} = require("kafkajs")

async function run(){    
    try
    {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers" :["http://localhost:9092"]
        })
        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
}

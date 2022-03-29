const {Kafka} = require("kafkajs")

async function run(){    
    try
    {
        const kafka = new Kafka({
            "clientId": "myapp",
            "brokers" :["http://localhost:9092"]
        })
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
}

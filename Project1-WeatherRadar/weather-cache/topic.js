const {Kafka} = require("kafkajs");

runTopic();
async function runTopic(){
    try
    {        
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "weatherCacheClient",
            "brokers" :["localhost:9092"]
        })

        //Admin interface to create topics
        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        
        //topic creation and partitioning radar names A-M, N-Z 
        await admin.createTopics({
            "topics": [{
                "topic" : "merra_outgoing"
            }]
        })
        console.log("Created Successfully!")
        await admin.disconnect();
    }
    catch(ex)
    {
        console.error(`Something bad happened ${ex}`)
    }
    finally{
        process.exit(0);
    }

}

//export {runTopic};
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

        //Admin interface to create topics
        const admin = kafka.admin();
        console.log("Connecting.....")
        await admin.connect()
        console.log("Connected!")
        
        //topic creation and partitioning radar names A-M, N-Z 
        await admin.createTopics({
            "topics": [{
                "topic" : "Users",
                "numPartitions": 2
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
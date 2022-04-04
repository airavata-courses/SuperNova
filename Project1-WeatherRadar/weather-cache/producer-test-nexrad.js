const {Kafka} = require("kafkajs")
//const msg = process.argv[2];

run();
async function run(){
    try
    {
        //kafka client connection
        const kafka = new Kafka({
            "clientId": "weatherCacheClient",
            "brokers" :["localhost:9092"]
        })

        //producer interface
        const producer = kafka.producer();
        console.log("Connecting.....")
        await producer.connect()
        console.log("Connected!")

        //producer send object with topic and messages having partitions of radar names A-M 0, N-Z 1
        //const partition = msg[0] < "N" ? 0 : 1;
        const msg = "nexRAD,KIND,03-10-2022,PROCESS_DONE,R0lGODlhkAGQAYc"
        const result =  await producer.send({
            "topic": "nexrad_outgoing",
            "messages": [
                {
                    "value": msg
                }
            ]
        })
        console.log(`Send Successfully! ${JSON.stringify(result)}`)
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
import json
from kafka import KafkaConsumer, KafkaProducer
import plotting


def nexrad_msg_consumer():
    try:
        print('NexRAD kafka Consumer has started')
        consumer = KafkaConsumer(
            'nexrad_incoming',
            bootstrap_servers=['kafka-0.kafka-headless.space-dev.svc.cluster.local:9092'],
            auto_offset_reset='earliest',
            enable_auto_commit=True,
            group_id='NexRAD_incoming_group',
            value_deserializer=lambda m: json.loads(m.decode('ascii')))

        for message in consumer:
            radar_id = message.value["radar_id"]
            date = message.value["date"]
            data_type = message.value["data_type"]

            if data_type == 'NexRAD':
                print("NexRAD Consumer Message Consumed: message_topic:{0}, message_partition:{1}, message_offset:{2} "
                      "message_key:{3}, data_type:{4} , radar_id:{5}, date:{6}"
                      .format(message.topic, message.partition,
                              message.offset, message.key,
                              data_type, radar_id, date))
                report_date = date.split('-')
                plot_file = plotting.plot_reflectivity(radar_id, int(report_date[0]), int(report_date[1]),
                                                       int(report_date[2]))
                # produce the required msg
                kafka_producer(plot_file, data_type, radar_id, date)
            else:
                print("NexRAD Consumer Message Discarded: Wrong dataType: message_topic:{0}, message_partition:{1}, "
                      "message_offset:{2} "
                      "message_key:{3}, data_type:{4} , radar_id:{5}, date:{6}".format(message.topic, message.partition,
                              message.offset, message.key,
                              data_type, radar_id, date))



    except Exception as e:
        print("NexRAD Consumer Exception:", e)


def kafka_producer(plot_file, data_type, radar_id, date):
    try:
        producer = KafkaProducer(bootstrap_servers=['kafka-0.kafka-headless.space-dev.svc.cluster.local:9092'])
        result = True if plot_file else False
        msg = bytes(data_type + "," + radar_id + "," + date + ",", 'ascii')
        if (result):
            producer.send('nexrad_outgoing', msg + plot_file).add_callback(on_send_success).add_errback(
                on_send_error)
    except Exception as e:
        print("NexRAD Producer Exception:", e)


def on_send_success(record_metadata, data_type, radar_id, date):
    print("NexRAD Producer Message Produced Success: message_topic:{0}, message_partition:{1}, message_offset:{2} "
          "message_key:{3}, data_type:{4} , radar_id:{5}, date:{6}"
          .format(record_metadata.topic, record_metadata.partition,
                  record_metadata.offset, record_metadata.key,
                  data_type, radar_id, date))


def on_send_error(record_metadata, data_type, radar_id, date, excp):
    print("NexRAD Producer Message Produced Error: message_topic:{0}, message_partition:{1}, message_offset:{2} "
          "message_key:{3}, data_type:{4} , radar_id:{5}, date:{6}, exception: {7}"
          .format(record_metadata.topic, record_metadata.partition,
                  record_metadata.offset, record_metadata.key,
                  data_type, radar_id, date, excp))



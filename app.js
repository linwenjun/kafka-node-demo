const kafka = require('kafka-node'),
  Producer = kafka.Producer;

require('dotenv').config();

const kafkaHost = process.env.KAFKA_HOST;

const client = new kafka.KafkaClient({kafkaHost});

const producer = new Producer(client);

let count = 1;

const send = ()=> {
  let message = JSON.stringify([{
    id: parseInt(Math.random() * 5),
    count,
    timestamp: parseInt(new Date().getTime() / 1000)
  }]);
  count++;

  let payloads = [{
    topic: 'test',
    messages: message, // multi messages should be a array, single message can be just a string or a KeyedMessage instance
    timestamp: Date.now() // <-- defaults to Date.now() (only available with kafka v0.10+)
  }] 
  console.log("Sending...")
  producer.send(payloads, ()=> {
    console.log(message)
  })
}

setInterval(send, 2000)
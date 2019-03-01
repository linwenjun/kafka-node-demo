const kafka = require('kafka-node'),
  Producer = kafka.Producer;

require('dotenv').config();

console.log(`kafka server addr: ${process.env.KAFKA_HOST}`);

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
    messages: message,
    timestamp: Date.now()
  }] 
  console.log("Sending...")
  producer.send(payloads, (e)=> {
    if(e) {
      console.log(e)
    } else {
      console.log(message);
    }
  })
}

setInterval(send, 2000)
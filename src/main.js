const cors = require("cors");
const express = require("express");
const { Kafka } = require("kafkajs");
const app = express();

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

app.use(cors());

app.get("/", async function (req, res) {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: "YarmarkaTopic", fromBeginning: true });

    const messages = [];

    await new Promise(async (res) => {
      let timeout = setTimeout(res, 1000);
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          clearTimeout(timeout);
          timeout = setTimeout(res, 1000);
          messages.push(message.value.toString());
        },
      });
    });
    await consumer.disconnect();
    res.send(messages);
  } catch (error) {
    res.send(error).status(400);
  }
});

app.listen(3000);

const cors = require("cors");
const express = require("express");
const { exec } = require("child_process");
const app = express();

const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

app.use(cors());

app.get("/", async function (req, res) {
  await consumer.connect();
  await consumer.subscribe({ topic: "YarmarkaTopic", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      res.send({
        value: message.value.toString(),
      });
    },
  });
});

app.listen(3000);

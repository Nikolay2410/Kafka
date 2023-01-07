const cors = require("cors");
const express = require("express");
const path = require("path");
const { Kafka } = require("kafkajs");

const PORT = 3000;

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "my-group" });

const app = express();
app.use(cors());
app.use(express.static(path.join("client", "src")));

async function consumeAllMessages() {
  const messages = [];
  await consumer.connect();
  await consumer.subscribe({ topic: "YarmarkaTopic", fromBeginning: true });
  await new Promise(async (resolve) => {
    let timeout = setTimeout(resolve, 1000);
    consumer.run({
      eachMessage: ({ topic, partition, message }) => {
        clearTimeout(timeout);
        timeout = setTimeout(resolve, 200);
        messages.push(message.value.toString());
      },
    });
    consumer.seek({ topic: "YarmarkaTopic", partition: 0, offset: 0 });
  });
  await consumer.disconnect();
  return messages;
}

app.get("/api/messages", async function (req, res) {
  try {
    const messages = await consumeAllMessages();
    res.send(messages);
  } catch (error) {
    res.send(error).status(400);
  }
});

app.listen(PORT, () => {
  console.log(`server started http://localhost:${PORT}`);
});

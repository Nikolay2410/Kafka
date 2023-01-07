// const cors = require("cors");
// const express = require("express");
const { Kafka } = require("kafkajs");
// const app = express();

const kafka = new Kafka({
  clientId: "kafka",
  brokers: ["localhost:9092"],
});
const consumer = kafka.consumer({ groupId: "test-group" });

// app.use(cors());

async function start() {
  try {
    const messages = [];
    await consumer.connect();
    await consumer.subscribe({ topic: "YarmarkaTopic", fromBeginning: true });
    await new Promise(async (resolve) => {
      let timeout = setTimeout(resolve, 2000);
      //
      console.log("consumer подписался на eachMessage");
      //
      await consumer.run({
        eachMessage: ({ topic, partition, message }) => {
          //
          console.log("Сообщение пришло");
          console.log(message);
          //
          clearTimeout(timeout);
          timeout = setTimeout(resolve, 2000);
          messages.push(message.value.toString());
        },
      });
    });
    //
    console.log("consumer отписался");
    //
    await consumer.disconnect();
    console.log(messages);
    // res.send(messages);
  } catch (error) {
    console.log(error);
    // res.send(error).status(400);
  }
}

start();

// app.get("/", async function (req, res) {
//   try {
//     const messages = [];
//     await consumer.connect();
//     await consumer.subscribe({ topic: "YarmarkaTopic", fromBeginning: true });
//     await new Promise(async (res) => {
//       let timeout = setTimeout(res, 2000);
//       await consumer.run({
//         eachMessage: ({ topic, partition, message }) => {
//           clearTimeout(timeout);
//           timeout = setTimeout(res, 2000);
//           messages.push(message.value.toString());
//         },
//       });
//     });
//     await consumer.disconnect();
//     res.send(messages);
//   } catch (error) {
//     res.send(error).status(400);
//   }
// });

// app.listen(3000);

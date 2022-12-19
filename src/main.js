const cors = require("cors");
const express = require("express");
const { exec } = require("child_process");
const app = express();

app.use(cors());

// respond with "hello world" when a GET request is made to the homepage
app.get("/", function (req, res) {
  exec(
    "~/kafka/bin/kafka-console-consumer.sh --bootstrap-server 'localhost:9092' --topic TutorialTopic --from-beginning",
    (error, stdout, stderr) => {
      if (error) {
        res.send(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        res.send(`stderr: ${stderr}`);
        return;
      }
      res.send(`stdout: ${stdout}`);
    }
  );
});

app.listen(3000, () => {
  console.log("https://localhost:3000/");
});

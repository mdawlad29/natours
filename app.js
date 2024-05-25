const express = require("express");
const fs = require("fs");
const app = express();
const port = 8000;

const tours = JSON.parse(fs.readFileSync(`./data/tours-sample.json`));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    message: "Hello from the server!",
    status: 200,
    result: tours.length,
    data: tours,
  });
});

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

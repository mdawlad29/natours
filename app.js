const fs = require("fs");
const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`./data/tours-sample.json`));

app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    message: "Hello from the server!",
    status: 200,
    result: tours.length,
    data: tours,
  });
});

app.get("/api/v1/tours/:id", (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(400).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
});

app.post("/api/v1/tour", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile("./data/tours-sample.json", JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: newTour,
    });
  });
});

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

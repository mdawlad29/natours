const fs = require("fs");
const express = require("express");
const port = 8000;

const app = express();
app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`./data/tours-sample.json`));

const getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    result: tours.length,
    data: tours,
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({
      status: "Failed",
      message: "Invalid ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: tour,
  });
};

const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile("./data/tours-sample.json", JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: "success",
      data: newTour,
    });
  });
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  res.status(201).json({
    status: "success",
    data: { tour: "Updated successful" },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: "failed",
      message: "Invalid ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
};

app.route("/api/v1/tours").get(getAllTours).post(createTour);
app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

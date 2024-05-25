const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/tours-sample.json`)
);

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTedAt: req.requestTime,
    result: tours.length,
    data: tours,
  });
};

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__direname}/../data/tours-sample.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: newTour,
      });
    }
  );
};

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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

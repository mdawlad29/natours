const express = require("express");
const app = express();
const port = 8000;

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello from the server!",
    app: "Natours",
  });
});

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

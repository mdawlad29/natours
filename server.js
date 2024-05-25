const app = require("./app");
const port = 8000;

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;

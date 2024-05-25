const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// #TODO lesson 6 complete and next start to lesson 7
const app = require('./app');
const port = process.env.PORT || 8000;

app.listen(port, (req, res) => {
  console.log(`App running on port ${port}...`);
});

module.exports = app;

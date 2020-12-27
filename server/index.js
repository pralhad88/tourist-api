const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const mongoose = require('mongoose');
const dbPath = require('../lib/config/database.config')
// create express app
const app = express();

const corsOptions = {
  origin: "http://localhost:3000"
};

// Database connection.
const options = {useNewUrlParser: true, useUnifiedTopology: true}
const mongo = mongoose.connect(dbPath.url, options);
mongo.then(() => {
  console.log('connected');
}, error => {
    console.log(error, 'error');
})

app.use(cors(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())

// import routes
require('../lib/routers')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
const express = require("express");
const app = express();
const routers = require("./src/routes/expressRouters");
const notFound = require("./src/middleware/404");
const {sequelize} = require("./src/models")
const errorHandling = require("./src/middleware/errorhandling");
const bodyParser = require("body-parser");
const consoleM = require("./src/middleware/console");
require('dotenv').config()
const port =  8080;

app.use(express.json());
app.use(express.static("/src/storage/uploads"));
app.use(routers);
app.use(errorHandling);
app.use(notFound);
// app.use(errorHandling);

app.listen(port, async() => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log("server is running");
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
});

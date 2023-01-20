const express = require("express");
const app = express();
const routers = require("./src/routes/expressRouters");
const notFound = require("./src/middleware/404");
const errorHandling = require("./src/middleware/errorhandling");
const bodyParser = require("body-parser");
const consoleM = require("./src/middleware/console");
const port = 8080;

app.use(express.json());
app.use(express.static("/src/storage/uploads"));
app.use(routers);
app.use(notFound);
// app.use(errorHandling);

app.listen(port, () => {
  console.log("server is running");
});

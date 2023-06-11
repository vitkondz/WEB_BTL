const express = require("express");
const cors = require("cors");
const app = express();

const _AuthMiddleWare = require("./src/common/_AuthMiddleWare");

/**
 * Cấu hình body-parser
 */
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
 * cors
 */
const corsOptions = {
  origin: "*",
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  method: ['GET', 'POST', 'PUT', 'DELETE'],
};
app.use(cors(corsOptions));

/**
 * Routers
 */
require('./src/login/login.router')(app);
app.use(_AuthMiddleWare.isAuth);
require('./src/passwordChange/passwordChange.router')(app);
require('./src/userChange/userChange.router')(app);
require('./src/userCreate/userCreate.router')(app);
require('./src/statistics/statistics.router')(app);
require('./src/registryRecord/registryRecord.router')(app);
require('./src/databaseUpdate/databaseUpdate.router')(app);
require('./src/carInfoSearch/carInfoSearch.router')(app);
require('./src/numberPlateInfo/numberPlateInfo.router')(app);
require('./src/userAccountDelete/userAccountDelete.router')(app);
require('./src/registryForecast/registryForecast.router')(app);

app.listen(3010, async () => {
  console.log("Server running at http://localhost:3010/");
});




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

app.listen(3010, () => {
  console.log("Server running at http://localhost:3010/");
});

// const NDODatabase = require("./src/common/NDODatabase");
// let timeFilter = require("./src/frontEndFunction/timeFilter");
// let areaFilter = require("./src/frontEndFunction/areaFilter");
// let nearlyExpiredFilter = require("./src/frontEndFunction/nearlyExpiredFilter");
// let numberPlateSearch = require("./src/frontEndFunction/numberPlateSearch");
// let data = {
//   "username": "admin",
//   "password": "abc123"
// }

// fetch("http://localhost:3010/statistics/VN0000", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiVk4wMDAxIiwicGFzc3dvcmQiOiIkMmIkMTAkR3ltODlmblJhNThrenBELnRvc2FLZXBlb1N3TFFiLzRaM1c5aS9hMktUY2R4emNlNGxDMjIifSwiaWF0IjoxNjg1NTQ2MTU3LCJleHAiOjE2ODU1NDk3NTd9.RZHb0NBVkyTTSB9kZnq5eDV18NTZmPFWq-6mjFZ6QOY",
//   },
// })
// .then((response) => {
//   if (response .status === 403) {
//     return ({result: false, err: "Token khong hop le"});
//   }
//   return response.json();
// })
// .then(async (data) => {
//     // console.log(await nearlyExpiredFilter(data.registrations));
//     console.log(await numberPlateSearch("204NPM1208", data.registrations, data.cars, data.owners));
//   }
// )
// .catch((error) => {
//   console.log(error);
// })



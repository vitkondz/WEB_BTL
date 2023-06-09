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


// let timeFilter = require("./src/frontEndFunction/timeFilter");
// let areaFilter = require("./src/frontEndFunction/areaFilter");
// let nearlyExpiredFilter = require("./src/frontEndFunction/nearlyExpiredFilter");
// let numberPlateSearch = require("./src/frontEndFunction/numberPlateSearch");
// let data = {
//   "username": "admin",
//   "password": "abc123"
// }
// let ownerSearch = require("./src/frontEndFunction/ownerSearch");
// let carSearch = require("./src/frontEndFunction/carSearch");
// let timeNumberFilter = require("./src/frontEndFunction/timeNumberFilter");
// let timeListFilter = require("./src/frontEndFunction/timeListFilter");

// fetch("http://localhost:3010/statistics/VN0000", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCQvcW5rQ3ptLlY0dU0vQ0xta3o4dHpPSEJpdEJRaVVnaEF6SUJqRDQyNXZ3ZUNGaEVWTWxMbSJ9LCJpYXQiOjE2ODYzMDUwMTEsImV4cCI6MTY4NjMwODYxMX0.dK2xgTGpFV5XJJtwiFYzgq7s6DFr9mug6VJNuWBZXps",
//   },
// })
// .then((response) => {
//   if (response .status === 403) {
//     return ({result: false, err: "Token khong hop le"});
//   }
//   return response.json();
// })
// .then(async (data) => {
//   if (data.result === false) {
//     console.log(data);
//   } else {
//       let tam = await nearlyExpiredFilter(data.registrations);
//       for (let i = 0; i < tam.length; i++) {
//         console.log(tam[i].date_expired);
//       }
//       // let registrations = data.registrations;
//       // for (let i = 0; i < 10; i++) {
//       //   console.log(await carSearch(data.cars, registrations[i].registration_number));
//       // }
//       // console.log(await ownerSearch(data.owners, "3333"));
//       // let tam = await timeNumberFilter(data.registrations, data.centers, 2020, false, false, false, false);
//       // for (let i = 0; i < tam.length; i++) {
//       //   console.log(tam[i]);
//       // }
//     }
//   }
// )
// .catch((error) => {
//   console.log(error);
// })



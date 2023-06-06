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

app.listen(3010, async () => {
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
//     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCQvcW5rQ3ptLlY0dU0vQ0xta3o4dHpPSEJpdEJRaVVnaEF6SUJqRDQyNXZ3ZUNGaEVWTWxMbSJ9LCJpYXQiOjE2ODU4OTI5NzEsImV4cCI6MTY4NTg5NjU3MX0.ba_5Bk8VR46NW80CvSSmS5nwMl3lZ4fVrfONvLZ66R4",
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
//       //console.log(data);
//   }
//   }
// )
// .catch((error) => {
//   console.log(error);
// })



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
// let timeFilter = require("./timeFilter");
// let areaFilter = require("./areaFilter");
// let data = {
//   "username": "admin",
//   "password": "abc123"
// }

// fetch("http://localhost:3010/registration/getAll", {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6IiQyYiQxMCRtN2hQRkt3TTNBSU9EbzBoT1p5b0NPNWlHQmVJVXNPejI3SHdjR25SZmN2Yzcvemp4bHJ5cSJ9LCJpYXQiOjE2ODQxNTc4OTYsImV4cCI6MTY4NDE2MTQ5Nn0.8aggw94pBl1QmE1YqEVWVxoSpzzCDv7Et3_J9tZcaYw",
//   },
// })
// .then((response) => {
//   if (response .status === 403) {
//     return ({result: false, err: "Token khong hop le"});
//   }
//   return response.json();
// })
// .then(async (data) => {
//     console.log(data);
//   }
// )
// .catch((error) => {
//   console.log(error);
// })



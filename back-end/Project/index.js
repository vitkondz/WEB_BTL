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
require("./src/routes/login.router")(app);
app.use(_AuthMiddleWare.isAuth);
require("./src/routes/account.router")(app);
require("./src/routes/user.router")(app);
require("./src/routes/database.route")(app);
require("./src/routes/registration.router")(app);
require("./src/routes/owner.router")(app);
require("./src/routes/car.router")(app);

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

// fetch("http://localhost:3010/account/login", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(data),
// })
// .then((response) => {
//   return response.json();
// })
// .then(async (data) => {
//     console.log(await timeFilter(data.registrations, data.center, 2022, false, false, "Bắc Giang", false));
//     console.log(await areaFilter(data.center));
//   }
// )
// .catch((error) => {
//   console.log(error);
// })
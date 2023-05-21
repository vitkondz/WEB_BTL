let databaseUpdateController = require("./databaseUpdate.controller");

module.exports = function (router) {
    router.post('/database/update', databaseUpdateController.dataGet);
}
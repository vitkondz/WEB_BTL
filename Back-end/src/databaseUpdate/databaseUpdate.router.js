let databaseUpdateController = require("./databaseUpdate.controller");

// Tao API cap nhat ho so xe va chu so huu
module.exports = function (router) {
    router.post('/database/update', databaseUpdateController.dataGet);
}
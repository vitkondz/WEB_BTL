let numberPlateInfoController = require('./numberPlateInfo.controller');

// Tao API lay tat ca thong tin bien so xe
module.exports = function (router) {
    router.get('/numberPlate/getAll', numberPlateInfoController.dataGet);
}
let passwordChangeController = require('./passwordChange.controller');

// Tao API doi mat khau
module.exports = function (router) {
    router.put('/account/passwordChange', passwordChangeController.dataGet);
}
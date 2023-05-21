let passwordChangeController = require('./passwordChange.controller');

module.exports = function (router) {
    router.put('/account/passwordChange', passwordChangeController.dataGet);
}
module.exports = function (router) {
    let userChangeController = require('./userChange.controller');

    router.put('/user/update', userChangeController.dataGet);
}
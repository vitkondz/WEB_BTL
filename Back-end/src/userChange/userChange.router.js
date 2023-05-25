let userChangeController = require('./userChange.controller');

// Tao API cap nhat thong tin nguoi dung
module.exports = function (router) {
    router.put('/user/update', userChangeController.dataGet);
}
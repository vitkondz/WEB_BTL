let userCreateController = require('./userCreate.controller');

// Tao API tao nguoi dung
module.exports = function(router) {
    router.post('/user/create', userCreateController.dataGet);
}
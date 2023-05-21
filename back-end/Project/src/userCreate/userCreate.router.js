let userCreateController = require('./userCreate.controller');

module.exports = function(router) {
    router.post('/user/create', userCreateController.dataGet);
}
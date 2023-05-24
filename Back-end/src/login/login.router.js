let loginController = require('./login.controller')

module.exports = function (router) {
    router.post('/login', loginController.dataGet);
}
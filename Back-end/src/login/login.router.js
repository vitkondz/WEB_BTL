let loginController = require('./login.controller')

// Tao API dang nhap
module.exports = function (router) {
    router.post('/login', loginController.dataGet);
}
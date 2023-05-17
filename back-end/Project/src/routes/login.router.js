let loginController = require('../controllers/login.controller');

module.exports = function (router) {
    router.post('/login', loginController.checkUser);
}
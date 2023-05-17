let accountController = require('../controllers/account.controller');

module.exports = function(router) {
     router.post('/account/login', accountController.login);
    router.put('/account/passwordChange', accountController.passwordChange);
}
module.exports = function(router) {
    let registerFormController = require('../controllers/registerForm.controller');

    router.post('/registerForm/create', registerFormController.createDetailInfo);
}
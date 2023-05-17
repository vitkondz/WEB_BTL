module.exports = function(router) {
    let registerFormController = require('../controllers/database.controller');

    router.post('/database/create', registerFormController.createDetailInfo);
}
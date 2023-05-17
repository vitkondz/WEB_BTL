module.exports = function (router) {
    let userController = require('../controllers/user.controller');

    router.post('/user/create', userController.createAccount);

    router.put('/user/update', userController.userUpdate);

    router.delete('/user/delete', userController.userDelete);
}
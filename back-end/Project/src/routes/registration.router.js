module.exports = function(router) {
    let registrationController = require('../controllers/registration.controller');

    router.get('/registration/getAll', registrationController.getAll);

    router.get('/registration/getById/:id', registrationController.getById);

    router.get('/registration/getByCenterId/:center_id', registrationController.getByCenterId);

    router.post('/registration/create', registrationController.create);

    router.put('/registration/update', registrationController.update);

    router.delete('/registraion/delete/:id', registrationController.delete);
}
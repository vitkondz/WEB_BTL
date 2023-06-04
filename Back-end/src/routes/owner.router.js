module.exports = function (router) {
    let ownerController = require('../controllers/owner.controller');

    router.get('/owner/getAll', ownerController.getAll);

    router.get('/owner/getById/:id', ownerController.getById);

    router.get('/owner/getByRegistrationNumber/:registration_number',ownerController.getByRegistrationNumber);

    router.post('/owner/create', ownerController.create);

    router.put('/owner/update', ownerController.update);

    router.delete('/owner/delete/:registration_number', ownerController.delete);
}

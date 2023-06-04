

module.exports = function(router) {
    let JWT = require('../common/_JWT');
    let carController = require('../controllers/car.controller');

    router.get('/car/getAll', carController.getAll);

    router.get('/car/getByNumberPlate/:number_plate', carController.getByNumberPlate);

    router.get('/car/getByRegistrationNumber/:registration_number', carController.getByRegistrationNumber);

    router.post('/car/create', carController.create);

    router.put('/car/update', carController.update);

    router.delete('/car/delete/:registration_number', carController.delete);

    // router.get('/token', async function (req, res) {
    //     let user = {
    //         username: "admin",
    //         password: "abc123",
    //     };
    //     const _token = await JWT.make(user);
    //     res.send({token: _token});
    // })

    // router.get("/checkToken", async function (req, res) {
    //     try {
    //         let _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFiYzEyMyJ9LCJpYXQiOjE2ODM2MjczOTYsImV4cCI6MTY4MzYzMDk5Nn0.Ow5m2xvPaOHhg5yl0j3VQa4iXLkJHC0nKNl4CwBalpQ";
    //         const data = await JWT.check(_token);
    //         res.send({data: data});
    //     } catch (err) {
    //         res.send({data: "Mã token không hợp lệ"});
    //     }
    // })
}

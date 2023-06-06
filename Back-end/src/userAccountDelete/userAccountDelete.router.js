let userAccountDeleteController = require('./userAccountDelete.controller');

// Tao API xoa tai khoan trung tam
module.exports = function(router) {
    router.delete('/user/account/delete/:unit_id', userAccountDeleteController.dataGet);
}
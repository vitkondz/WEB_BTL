let carInfoSearchController = require('./carInfoSearch.controller');

// Tao API lay thong tin xe theo yeu cau
module.exports = function(router) {
    router.get('/carInfo/getByNumberPlate/:number_plate', carInfoSearchController.dataGet);
}
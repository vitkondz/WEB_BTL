let carInfoSearchController = require('./carInfoSearch.controller');

module.exports = function(router) {
    router.get('/carInfo/getByNumberPlate/:number_plate', carInfoSearchController.dataGet);
}
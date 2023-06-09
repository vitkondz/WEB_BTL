let registryForecastController = require('./registryForecast.controller');

// Tao API du bao so luong xe dang kiem moi va dang kiem lai
module.exports = function (router) {
    router.post('/registry/forecast', registryForecastController.dataGet);
}
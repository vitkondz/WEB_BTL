let statisticsController = require('./statistics.controller');

module.exports = function (router) {
    router.get('/statistics/:center_id', statisticsController.dataGet);
}
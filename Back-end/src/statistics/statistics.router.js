let statisticsController = require('./statistics.controller');

// Tao API thong ke
module.exports = function (router) {
    router.get('/statistics/:center_id', statisticsController.dataGet);
}
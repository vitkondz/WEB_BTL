let registryRecordController = require('./registryRecord.controller');

module.exports = function(router) {
    router.post('/registry/update', registryRecordController.dataGet);
}
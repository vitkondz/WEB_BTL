let registryRecordController = require('./registryRecord.controller');

// Tao API cap nhat thong tin dang kiem
module.exports = function(router) {
    router.post('/registry/update', registryRecordController.dataGet);
}
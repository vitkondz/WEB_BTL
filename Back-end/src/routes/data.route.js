module.exports = function(router) {
    let dataController = require('../controllers/data.controller');

    router.post('/data/update', dataController.createDetailInfo);
}
let registryRecordModel = require('./registryRecord.model');

exports.dataGet = function(req, res) {
    let data = req.body;
    registryRecordModel.registryUpdate(data, function(response) {
        res.send(response);
    })
}
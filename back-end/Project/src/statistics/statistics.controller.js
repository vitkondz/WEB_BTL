let statisticsModel = require('./statistics.model');

exports.dataGet = function(req, res) {
    let center_id = req.params.center_id;
    statisticsModel.registryDataGet(center_id, function(response) {
        res.send(response);
    })
}
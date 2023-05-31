let statisticsModel = require('./statistics.model');

exports.dataGet = async function(req, res) {
    // Lay du lieu tu request thong ke
    let center_id = await req.params.center_id;

    // Goi ham xu ly request thong ke
    statisticsModel.registryDataGet(center_id, function(response) {
        res.send(response);
    })
}
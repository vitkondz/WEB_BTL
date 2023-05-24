let databaseUpdateModel = require('./databaseUpdate.model');

exports.dataGet = function(req, res) {
    let data = req.body;
    databaseUpdateModel.registrationUpdate(data, function(response) {
        res.send(response);
    })
}
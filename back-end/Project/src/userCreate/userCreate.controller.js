let userCreateModel = require('./userCreate.model');

exports.dataGet = function (req, res) {
    let data = req.body;
    userCreateModel.userCreate(data, function (response) {
        res.send(response);
    });
}
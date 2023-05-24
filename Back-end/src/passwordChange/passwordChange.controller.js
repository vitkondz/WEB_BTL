let passwordChangeModel = require('./passwordChange.model');

exports.dataGet = function (req, res) {
    let data = req.body;
    passwordChangeModel.passwordChange(data, function (response) {
        res.send(response);
    })
}
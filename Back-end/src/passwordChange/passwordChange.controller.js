let passwordChangeModel = require('./passwordChange.model');


exports.dataGet = function (req, res) {
    // Lay du lieu tu request doi mat khau
    let data = req.body;

    // Goi ham xu ly request doi mat khau
    passwordChangeModel.passwordChange(data, function (response) {
        res.send(response);
    })
}
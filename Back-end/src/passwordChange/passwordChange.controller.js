let passwordChangeModel = require('./passwordChange.model');


exports.dataGet = async function (req, res) {
    // Lay du lieu tu request doi mat khau
    let data = await req.body;

    // Goi ham xu ly request doi mat khau
    passwordChangeModel.passwordChange(data, function (response) {
        res.send(response);
    })
}
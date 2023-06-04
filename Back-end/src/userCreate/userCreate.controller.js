let userCreateModel = require('./userCreate.model');

exports.dataGet = function (req, res) {
    // Lay du lieu nguoi dung moi
    let data = req.body;

    // Goi ham xu ly tao nguoi dung
    userCreateModel.userCreate(data, function (response) {
        res.send(response);
    });
}
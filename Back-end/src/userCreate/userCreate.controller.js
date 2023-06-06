let userCreateModel = require('./userCreate.model');

exports.dataGet = async function (req, res) {
    // Lay du lieu nguoi dung moi
    let data = await req.body;

    // Goi ham xu ly tao nguoi dung
    userCreateModel.userCreate(data, function (response) {
        res.send(response);
    });
}
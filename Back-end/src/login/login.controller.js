let loginModel = require("./login.model");

exports.dataGet = async function (req, res) {
    // Lay du lieu tu request dang nhap
    let data = await req.body;

    // Goi ham xu li request dang nhap
    loginModel.accountCheck(data, function (response) {
        res.send(response);
    })
}
let loginModel = require("./login.model");

exports.dataGet = function (req, res) {
    let data = req.body;
    loginModel.accountCheck(data, function (response) {
        res.send(response);
    })
}
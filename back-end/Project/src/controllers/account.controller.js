let Account = require('../models/account.model');

exports.login = function (req, res) {
    let data = req.body;
    Account.login(data, function (response) {
        res.send(response);
    })
}

exports.passwordChange = function (req, res) {
    let data = req.body;
    Account.passwordChange(data, function (response) {
        res.send(response);
    })
}
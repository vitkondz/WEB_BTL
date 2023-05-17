let Login = require('../models/login.model');

exports.checkUser = function (req, res) {
    let data = req.body;
    Login.checkAccount(data, function (response) {
        
        res.send(response);
    })
}
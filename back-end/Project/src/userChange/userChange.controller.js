let userChangeModel = require('./userChange.model');

exports.dataGet = function(req, res) {
    let data = req.body;
    userChangeModel.userUpdate(data, function (response) {
        res.send(response);
    })
}
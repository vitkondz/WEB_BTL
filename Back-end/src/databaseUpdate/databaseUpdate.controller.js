let databaseUpdateModel = require('./databaseUpdate.model');

exports.dataGet = function(req, res) {
    // Lay du lieu tu request cap nhat ho so xe va chu so huu
    let data = req.body;

    // Goi ham xu li request cap nhat ho so xe va chu so huu
    databaseUpdateModel.registrationUpdate(data, function(response) {
        res.send(response);
    })
}
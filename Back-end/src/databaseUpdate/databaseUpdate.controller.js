let databaseUpdateModel = require('./databaseUpdate.model');

exports.dataGet = async function(req, res) {
    // Lay du lieu tu request cap nhat ho so xe va chu so huu
    let data = await req.body;

    // Goi ham xu li request cap nhat ho so xe va chu so huu
    databaseUpdateModel.registrationUpdate(data, function(response) {
        res.send(response);
    })
}
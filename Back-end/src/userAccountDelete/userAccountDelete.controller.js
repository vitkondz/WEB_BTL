let userAccountDeleteModel = require('./userAccountDelete.model');

exports.dataGet = async function(req, res) {
    // Lay du lieu tu request xoa tai khoan trung tam
    let unit_id = await req.params.unit_id;

    // Goi ham xu ly request xoa tai khoan trung tam
    userAccountDeleteModel.accountDelete(unit_id, function(response) {
        res.send(response);
    })
}
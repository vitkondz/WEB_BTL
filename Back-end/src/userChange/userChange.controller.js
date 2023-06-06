let userChangeModel = require('./userChange.model');

exports.dataGet = async function(req, res) {
    // Lay du lieu tu request cap nhat thong tin nguoi dung
    let data = await req.body;

    // Goi ham xu ly request cap nhat thong tin nguoi dung
    userChangeModel.userUpdate(data, function (response) {
        res.send(response);
    })
}
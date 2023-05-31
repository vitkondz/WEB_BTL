let registryRecordModel = require('./registryRecord.model');

exports.dataGet = async function(req, res) {
    // Lay du lieu tu request cap nhat thong tin dang kiem 
    let data = await req.body;

    // Goi ham xu ly request cap nhat thong tin dang kiem 
    registryRecordModel.registryUpdate(data, function(response) {
        res.send(response);
    })
}
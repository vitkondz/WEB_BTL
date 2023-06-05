let numberPlateInfoModel = require('./numberPlateInfo.model');

exports.dataGet = async function(req, res) {
    // Goi ham xu ly request lay thong tin bien so xe
    numberPlateInfoModel.numberPlateGetAll(function (response) {
        res.send(response);
    })
}
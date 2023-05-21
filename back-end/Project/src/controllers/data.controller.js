let dataModel = require('../models/data.model');

//Tạo thông tin về hồ sơ đăng kiểm, chủ sở hữu, hồ sơ xe cho xe mới
exports.createDetailInfo = function(req, res) {
    let data = req.body;
    dataModel.updateData(data, function(response) {
        res.send({result: response});
    })
};

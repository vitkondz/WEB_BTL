let RegisterForm = require('../models/registerForm.model');

//Tạo thông tin về hồ sơ đăng kiểm, chủ sở hữu, hồ sơ xe cho xe mới
exports.createDetailInfo = function(req, res) {
    let data = req.body;
    RegisterForm.get_data(data, function(response) {
        res.send({result: response});
    })
};

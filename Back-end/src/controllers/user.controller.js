let User = require("../models/user.model");

// Tạo thông tin và tài khoản cho trung tâm mới
exports.createAccount = function (req, res) {
  let data = req.body;
   User.createAccount(data, function (reponse) {
     res.send(reponse);
   });
};

// Thay đổi thông tin trung tâm
exports.userUpdate = function (req, res) {
  let data = req.body;
  User.userUpdate(data, function (reponse) {
    res.send(reponse);
  })
}

//Xóa trung tâm
exports.userDelete = function (req, res) {
  User.userDelete(req.params.center_id, function (reponse) {
    res.send(reponse);
  })
}
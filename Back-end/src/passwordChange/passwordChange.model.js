const database = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class PasswordChange {
    constructor() {}

    // Ham xu li doi mat khau
    static async passwordChange(data, result) {
        let unit_id = data.unit_id;
        let oldPassword = data.oldPassword;
        let newPassword = data.newPassword;

        //Kiem tra mat khau cu
        let queries = [];
        let values = [];
        let query = "select * from account_list where unit_id = ?";
        let value = [unit_id];
        queries.push(query);
        values.push(value);

        // Lay thong tin mat khau trong co so du lieu
        database.get(queries, values)
        .then((res) => {
            let realPassword = res[0][0].password;
            bcrypt.compare(oldPassword, realPassword, (err, kq) => {
                if (err) {
                    // Truong hop xay ra loi do ham so sanh mat khau
                    result({result: false, error: err.message});
                } else if (kq) {
                    // Truong hop kiem tra mat khau cu dung
                    // Ma hoa mat khau moi
                    bcrypt.hash(newPassword, saltRounds, (err, hash) => {
                        if (err) {
                            // Truong hop xay ra loi ham ma hoa
                            result({result: false});
                        } else {
                            // Cap nhat mat khau vao co so du lieu
                            let queries = [];
                            let values = [];
                            let query = "UPDATE account_list SET password = ? where unit_id = ?";
                            let value = [hash, unit_id];
                            queries.push(query);
                            values.push(value);

                            database.set(queries, values)
                            .then((res) => {
                                // Truong hop cap nhat mat khau thanh cong
                                result({result: true});
                            })
                            .catch((err) => {
                                // Truong hop xay ra loi truy van co so du lieu
                                result({result: false, error: err.message});
                            })
                        } 
                    })
                } else {
                    // Truong hop nhap sai mat khau cu
                    result({result: false});
                }
            })
        }) 
    }
}

module.exports = PasswordChange;
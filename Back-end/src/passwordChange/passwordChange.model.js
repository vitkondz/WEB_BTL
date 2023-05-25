const database = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class PasswordChange {
    constructor() {}

    // Ham xu li doi mat khau
    static async passwordChange(data, result) {
        let unit_id = data.unit_id;
        let newPassword = data.password;

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

                database.set(query, values)
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
        
    }
}

module.exports = PasswordChange;
const NDODatabase = require('../common/NDODatabase');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
    constructor(user) {
    }
    // Tạo thông tin và tài khoản cho trung tâm mới
    static createAccount(data, result) {
        let database = new NDODatabase();
        let newCenter = [
            data.center_id,
            data.center_name,
            data.province,
            data.area,
        ];
        database.set("INSERT INTO center_information (center_id, center_name, center_province, center_area) values (?, ?, ?, ?)", newCenter)
        .then()
        .catch((err) => {
            result({result: false});
        })
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            let newAccount = [
                data.account,
                hash,
                "user",
                data.center_id
            ];
            database.set("INSERT INTO account_list (account, password, type_of_account, unit_id) values (?, ?, ?, ?)", newAccount)
            .then()
            .catch((err) => {
            result({result: false});
        })
        });

        result({ result: true });
    }

    static userUpdate(data, result) {
        let database = new NDODatabase();
        let center_id = data.center_id;
        let newCenterName = data.center_name;
        let newProvince = data.province;
        let newArea = data.area;
        let query = "update center_information set center_name=?, province=?, area=? where center_id = ?";
        let values = [newCenterName, newProvince, newArea, center_id];
        database.set(query, values)
        .then((res) => {
            result({result: true});
        })
        .catch((err) => {
            result({result: false});
        });
    }

    static userDelete(center_id, result) {
        let database = new NDODatabase();
        let query = "delete from center_information where center_id = ?";
        let values = [center_id];
        database.set(query, values)
        .then((res) => {
            result({result: true});
        })
        .catch((err) => {
            result({result: false});
        })
    }
}

    

module.exports = User;
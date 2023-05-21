const NDODatabase = require('../common/NDODatabase');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserCreate {
    constructor(userCreate) {}
    static async userCreate(data, result) {
        let database = new NDODatabase();
        let newCenter = [
            data.center_id,
            data.center_name,
            data.province,
            data.area,
        ];
        let query1 = "INSERT INTO center_information (center_id, center_name, province, area) values (?, ?, ?, ?)";
        database.set(query1, newCenter)
        .then(() => {
            bcrypt.hash(data.password, saltRounds, function (err, hash) {
                let newAccount = [
                    data.account,
                    hash,
                    "user",
                    data.center_id
                ];
                let query2 = "INSERT INTO account_list (account, password, type_of_account, unit_id) values (?, ?, ?, ?)";
                database.set(query2, newAccount)
                .then(() => {
                    result({ result: true });
                })
                .catch((err) => {
                result({result: false, error: err.message});
                })
            });
        })
        .catch((err) => {
            result({result: false, error: err.message});
        })
    }
}

module.exports = UserCreate;
const database = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class PasswordChange {
    constructor(passwordChange) {}
    static async passwordChange(data, result) {
        let unit_id = data.unit_id;
        let newPassword = data.password;
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            if (err) {
                result({result: false});
            } else {

                let queries = [];
                let values = []
                let query = "UPDATE account_list SET password = ? where unit_id = ?";
                let value = [hash, unit_id];
                queries.push(query);
                values.push(value);

                database.set(query, values)
                .then((res) => {
                    result({result: true});
                })
                .catch((err) => {
                    result({result: false});
                })
            } 
        })
        
    }
}

module.exports = PasswordChange;
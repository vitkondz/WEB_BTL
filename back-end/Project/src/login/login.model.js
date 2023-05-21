const database = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const JWT = require('../common/_JWT');

class Login {
    constructor(login) {}

    static async accountCheck(data, result) {
        let queries = [];
        let values = [];
        let username = data.username;
        let pass = data.password;
        let query = "SELECT * FROM account_list WHERE account =?";
        let value = [username];
        queries.push(query);
        values.push(value);
        
        database.get(queries, values).then((res) => {    
            let user = res[0][0];
            bcrypt.compare(pass, user.password, async function (err, kq) {
                if (err) {
                    result({result: false, error: err});
                } else if (kq) {
                    let account = {
                        username: user.account,
                        password: user.password,
                    };
                    const _token = await JWT.make(account);
                    let queries = [];
                    let values = [];

                    query = "SELECT * FROM center_information WHERE center_id=?";
                    value = [user.unit_id];
                    queries.push(query);
                    values.push(value);

                    database.get(queries, values)
                    .then((res) => {
                        let centerInfo = res[0][0];
                        centerInfo.type_of_account = user.type_of_account;
                        result({result: _token, centerInfo: centerInfo});
                    })
                    .catch((err) => {
                        result({result: false, error: err.message});
                    })
                } else {
                    result({result: false});
                }    
            });   
        }).catch((err) => {
            result({result: false, error: err});
        });
    }
}

module.exports = Login;
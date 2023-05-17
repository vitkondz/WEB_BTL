const NDODatabase = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const JWT = require('../common/_JWT');

class Login {
    constructor(login) {}

    static async checkAccount(data, result) {
        let database = new NDODatabase();
        let username = data.username;
        let pass = data.password;
        let query = "SELECT * FROM account_list WHERE account =?";
        let values = [username];
        
        database.get(query, values).then((account_list) => {    
            let user = account_list[0];
            bcrypt.compare(pass, user.password, async function (err, kq) {
                if (err) {
                    result({result: false, error: err});
                } else if (kq) {
                    let account = {
                        username: user.account,
                        password: user.password,
                    };
                    const _token = await JWT.make(account);
                    query = "SELECT * FROM center_information WHERE center_id=?";
                    values = [user.unit_id];
                    database.get(query, values).then((center_list) => {
                        let centerInfo = center_list[0];
                        centerInfo.type_of_account = user.type_of_account;
                        result({result: _token, centerInfo: centerInfo});
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
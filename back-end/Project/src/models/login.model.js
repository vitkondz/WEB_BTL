const NDODatabase = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const JWT = require('../common/_JWT');

class Login {
    constructor(login) {}

    static async checkAccount(data, result) {
        let database = new NDODatabase();
        let username = data.username;
        let pass = data.password;
        
        database.get("SELECT * FROM account_list WHERE account =?", [username]).then((account_list) => {    
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
                    result({result: _token});
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
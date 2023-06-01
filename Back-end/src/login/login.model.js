const database = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const JWT = require('../common/_JWT');

class Login {
    constructor() {}

    // Ham xu ly thong tin dang nhap
    static async accountCheck(data, result) {
        let username = data.username;
        let pass = data.password;

        // Lay du lieu tai khoan 
        let queries = [];
        let values = [];
        let query = "SELECT * FROM account_list WHERE account =?";
        let value = [username];
        queries.push(query);
        values.push(value);

        database.get(queries, values).then((res) => {    
            let user = res[0][0];

            // Kiem tra tai khoan hop le
            bcrypt.compare(pass, user.password, async function (err, kq) {
                if (err) {
                    // Truong hop xay ra loi do ham so sanh
                    result({result: false, error: err.message});
                } else if (kq) {
                    // Tai khoan hop le
                    let account = {
                        username: user.account,
                        password: user.password,
                    };

                    //Tao token
                    const _token = await JWT.make(account);
                    let queries = [];
                    let values = [];

                    // Tra ve thong tin tai khoan
                    query = "SELECT * FROM center_information WHERE center_id=?";
                    value = [user.unit_id];
                    queries.push(query);
                    values.push(value);

                    database.get(queries, values)
                    .then((res) => {
                        // Truong hop lay thong tin thanh cong
                        let centerInfo = res[0][0];
                        centerInfo.type_of_account = user.type_of_account;
                        result({result: _token, centerInfo: centerInfo});
                    })
                    .catch((err) => {
                        // Truong hop xay ra loi truy van co so du lieu
                        result({result: false, error: err.message});
                    })
                } else {
                    // Truong hop tai khoan khong hop le
                    result({result: false, error: "Invalid account"});
                }    
            });   
        }).catch((err) => {
            // Truong hop xay ra loi truy van co so du lieu
            result({result: false, error: err.message});
        });
    }
}

module.exports = Login;
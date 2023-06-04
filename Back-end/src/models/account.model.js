const NDODatabase = require("../common/NDODatabase");
const bcrypt = require('bcrypt');
const saltRounds = 10;

class Account {
    constructor(account) {}
    static async login(data, result) {
        let database = new NDODatabase();
        let username = data.username;
        let pass = data.password;
        
        database.get("SELECT * FROM account_list WHERE account =?", [username]).then((account_list) => {    
            let user = account_list[0];
            let unit_type = user.type_of_account;
            let center_id = user.unit_id;
            bcrypt.compare(pass, user.password, async function (err, kq) {
                if (kq) {
                    database.get("SELECT * from registration_information", [])
                .then((registration_information) => {

                    database.get("SELECT * from car_information", [])
                    .then((car_information) => {

                        database.get("SELECT * from owner_information", [])
                        .then((owner_information) => {

                            database.get("SELECT * from center_information", [])
                            .then((center_information) => {

                                database.get("SELECT * from account_list where unit_id=?", [center_id])
                                .then((account_information) => {
                                    //Trường hợp tài khoảng đăng nhập không phải là admin
                                    if (unit_type !== "admin") {
                                        let checkRegistrationNumber = [];
                                        for (let i = 0 ; i < registration_information.length; i++) {
                                            if (registration_information[i].center_id !== center_id) {
                                                checkRegistrationNumber[registration_information[i].registration_number] = false;
                                                registration_information.splice(i, 1);
                                                i--;
                                            } else {
                                                checkRegistrationNumber[registration_information[i].registration_number] = true;
                                            }
                                        }
                
                                        for (let i = 0; i < car_information.length; i++) {
                                            if (checkRegistrationNumber[car_information[i].registration_number] === false) {
                                                car_information.splice(i, 1);
                                                i--;
                                            }
                                        }
                
                                        for (let i = 0; i < owner_information.length; i++) {
                                            if (checkRegistrationNumber[owner_information[i].registration_number] === false) {
                                                owner_information.splice(i, 1);
                                                i--;
                                            }
                                        }

                                        for (let i = 0; i < center_information.length; i++) {
                                            if (center_information[i].center_id !== center_id) {
                                                center_information.splice(i, 1);
                                                i--;
                                            }
                                        }
                                    }

                                    result({ registrations: registration_information, cars: car_information, owners: owner_information, center: center_information, account: account_information});
                                
                                })
                            })
                        })
                    })
                })
                } else {
                    result({result: false});
                }    
            });   
        }).catch((err) => {
            result({ result: false});
        });
    }

    static async passwordChange(data, result) {
        let database = new NDODatabase();
        let unit_id = data.unit_id;
        let newPassword = data.password;
        bcrypt.hash(newPassword, saltRounds, (err, hash) => {
            if (err) {
                result({result: false});
            } else {
                let query = "UPDATE account_list SET password = ? where unit_id = ?";
                let values = [hash, unit_id];
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

module.exports = Account;

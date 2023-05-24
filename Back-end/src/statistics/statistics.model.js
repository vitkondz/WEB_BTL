const database = require("../common/NDODatabase");

class Statistics {
    constructor(statistics) {}
    static async registryDataGet(center_id, result) {
        let queries1 = [];
        let values1 = [];

        let query1 = "SELECT * from account_list where unit_id = ?"
        let value1 = [center_id];
        queries1.push(query1);
        values1.push(value1);

        database.get(queries1, values1)
        .then((res) => {
            let account_list = res[0];
            let unit_type = account_list[0].type_of_account;
            let queries2 = [];
            let values2 = [];

            let query2 = "SELECT * from registration_information";
            queries2.push(query2);
            values2.push([]);
          
                
            let query3 = "SELECT * from car_information";
            queries2.push(query3);
            values2.push([]);
             
    
            let query4 = "SELECT * from owner_information";
            queries2.push(query4);
            values2.push([]);
          
    
            let query5 = "SELECT * from center_information";
            queries2.push(query5);
            values2.push([]);
                      
    
            let query6 = "SELECT * from account_list where unit_id=?";
            let value6 = [center_id];
            queries2.push(query6);
            values2.push(value6);
                            
            database.get(queries2, values2)
            .then((res) => {
                let registration_information = res[0];
                let car_information = res[1];
                let owner_information = res[2];
                let center_information = res[3];
                let account_information = res[4];
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
            .catch((err) => {
                result({result: false, error: err.message});
            })
        })
        .catch((err) => {
            result({result: false, error: err.message});
        })
    }
}

module.exports = Statistics;

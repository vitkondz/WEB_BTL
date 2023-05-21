const NDODatabase = require("../common/NDODatabase");

class Statistics {
    constructor(statistics) {}
    static async registryDataGet(center_id, result) {
        let database = new NDODatabase();
        let query1 = "SELECT * from account_list where unit_id = ?"
        let values1 = [center_id];
        database.get(query1, values1)
        .then((account_list) => {
            let unit_type = account_list[0].type_of_account;
            let query2 = "SELECT * from registration_information";
            database.get(query2, [])
            .then((registration_information) => {
                
                let query3 = "SELECT * from car_information";
                database.get(query3, [])
                .then((car_information) => {
    
                    let query4 = "SELECT * from owner_information";
                    database.get(query4, [])
                    .then((owner_information) => {
    
                        let query5 = "SELECT * from center_information";
                        database.get(query5, [])
                        .then((center_information) => {
    
                            let query6 = "SELECT * from account_list where unit_id=?";
                            let values6 = [center_id]
                            database.get(query6, values6)
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
        })
        
    }
}

module.exports = Statistics;

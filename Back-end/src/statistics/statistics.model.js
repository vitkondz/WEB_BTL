const database = require("../common/NDODatabase");

class Statistics {
    constructor() {}

    // Ham lay thong tin thong ke
    static async registryDataGet(center_id, result) {
        // Lay thong tin tai khoan
        let queries1 = [];
        let values1 = [];
        let query1 = "SELECT * from account_list where unit_id = ?"
        let value1 = [center_id];
        queries1.push(query1);
        values1.push(value1);

        database.get(queries1, values1)
        .then((res) => {

            // Thong tin tai khoan va kieu tai khoan
            let account_list = res[0];
            let unit_type = account_list[0].type_of_account;

            // Mang cac cau lenh truy van lay du lieu dang kiem, xe, chu so huu, trung tam va mang gia tri tuong ung
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
                      
    
           
                      
            // Thuc hien truy van lay du lieu dang kiem, xe, chu so huu, trung tam
            database.get(queries2, values2)
            .then((res) => {
                // Du lieu dang kiem, xe, chu so huu, trung tam
                let registration_information = res[0];
                let car_information = res[1];
                let owner_information = res[2];
                let center_information = res[3];
                // let account_information = res[4];

                //Truong hop tai khoan dang nhap khong phai la admin
                if (unit_type !== "admin") {

                    // Thuc hien loc thong tin theo trung tam tuong ung 
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

                    // Tra ve du lieu
                    result({result: true, registrations: registration_information, cars: car_information, owners: owner_information, center: center_information});
                } else {
                    // Neu la tai khoan cuc dang kiem thi kiem tra trang thai tai khoan trung tam
                    let queries3 = [];
                    let values3 = []
                    let query6 = "SELECT * from account_list";
                    let value6 = [];
                    queries3.push(query6);
                    values3.push(value6);

                    database.get(queries3, values3)
                    .then((res) => {
                        let account_information = res[0];
                        let accountCheck = [];
                        for (let i = 0; i < account_information.length; i++) {
                            accountCheck[account_information[i].unit_id] = true;
                        }

                        for (let i = 0; i < center_information.length; i++) {
                            if (accountCheck[center_information[i].center_id] === true) {
                                center_information[i].account_status = true;
                            } else {
                                center_information[i].account_status = false;
                            }
                        }
                        
                        // Tra ve du lieu
                        result({result: true, registrations: registration_information, cars: car_information, owners: owner_information, center: center_information});
                    })
                    .catch((err) => {
                        // Truong hop xay ra loi truy van co so du lieu thon tin tai khoan
                        result({result: false, error: err.message});
                    })
                    
                }
            })
            .catch((err) => {
                // Truong hop xay ra loi truy van co so du lieu dang kiem, xe, chu so huu, don vi dang kiem
                result({result: false, error: err.message});
            })
        })
        .catch((err) => {
            // Truong hop xay ra loi truy van co so du lieu tai khoan
            result({result: false, error: err.message});
        })
    }
}

module.exports = Statistics;

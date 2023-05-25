const database = require('../common/NDODatabase');

class DatabaseUpdate {
   constructor() {
   }

   // Ham xu li cap nhat ho so xe va chu so huu
   static async registrationUpdate(data, result) {
        let registrations = data.registrations;
        let results = [];

        // Duyet mang danh sach xe va chu so huu
        for (let i = 0; i < registrations.length; i++) {
            let number_plate = await registrations[i].number_plate;
            let check = await numberPlateCheck(number_plate);
            if (check === true) {
                // Mang cac truy van va mang gia tri tuong ung voi cac truy van
                let queries = [];
                let values = [];

                // Thong tin xe
                let newCarInfo = [
                    registrations[i].registration_number,
                    registrations[i].number_plate,
                    registrations[i].car_name,
                    registrations[i].province,
                    registrations[i].date_registered,
                    registrations[i].brand,
                    registrations[i].purpose_of_use,
                    registrations[i].owner_name,
                    registrations[i].owner_id
                ];
                let query2 = "INSERT into car_information (registration_number, number_plate, car_name, province, date_registered, brand, purpose_of_use, owner_name, owner_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
                queries.push(query2);
                values.push(newCarInfo);

                // Thong tin chu so huu
                let newOwnerInfo = [
                    registrations[i].registration_number,
                    registrations[i].owner_name,
                    registrations[i].type_of_ownership,
                    registrations[i].owner_id,
                    registrations[i].owner_address,
                    registrations[i].contact_number,
                ];
                let query3 = "INSERT into owner_information (registration_number, owner_name, type_of_ownership, owner_address, contact_number, owner_id) values (?, ?, ?, ?, ?, ?)";
                queries.push(query3);
                values.push(newOwnerInfo);

                // Cap nhat vao co so du lieu
                await database.set(queries, values)
                .then((res) => {
                    // Truong hop cap nhat thanh cong
                    results.push(true);
                })
                .catch((err) => {
                    // Truong hop xay ra loi truy van co so du lieu
                    results.push(err.message);
                })
            } else {
                // Truong hop bien so xe khong hop le
                results.push(check);
            }
        }

        // Tra ve ket qua cap nhat cua tung xe
        result({result: results});
       // Registration.checkRegistrationValid(data, function (response) {
       //     if (response === true) {
       //         //Tách dữ liệu thành 3 phần tương ứng với 3 cở sử dữ liệu: thông tin đăng kiểm, thông tin xe, thông tin chủ sở hữu
       //         let newRegistrationInfo = {
       //             number_plate: data.number_plate,
       //             owner_name: data.owner_name,
       //             owner_id: data.owner_id,
       //             date_issued: data.date_issued,
       //             date_expired: data.date_expired,
       //             center_name: data.center_name,
       //             center_id: data.center_id,
       //             status: data.status,
       //         };
       //         Registration.create(newRegistrationInfo, function (response) {
       //             {
       //             //    result({result: response});
       //             }
       //         });

       //         let newCarInfo = {
       //             number_plate: data.number_plate,
       //             car_name: data.car_name,
       //             province: data.province,
       //             date_registered: data.date_registered,
       //             brand: data.brand,
       //             purpose_of_use: data.purpose_of_use,
       //             owner_name: data.owner_name,
       //             owner_id: data.owner_id
       //         };
       //         Car.create(newCarInfo, function (response) {
       //             {
       //             //    result({result: response});
       //             }
       //         });

       //         let newOwnerInfo = {
       //             owner_name: data.owner_name,
       //             type_of_ownership: data.type_of_ownership,
       //             owner_id: data.owner_id,
       //             owner_address: data.owner_address,
       //             contact_number: data.contact_number,
       //         };
       //         Owner.create(newOwnerInfo, function (response) {
       //             {
       //             //    result({result: response});
       //             }
       //         });
       //         result({ result: 'Dang kiem xe co bien so ' + data.number_plate + ' thanh cong' });
       //     } else {
       //         result({ result: 'Dang kiem xe co bien so ' + data.number_plate + ' that bai' });
       //     }
       // });
   }
}

// Ham kiem tra bien so xe hop le
async function numberPlateCheck(number_plate) {
    return new Promise(async (resolve, reject) => {
        try {
            let queries = [];
            let values = [];

            // Lay du lieu xe trong co so du lieu 
            let query = "SELECT * FROM registration_information";
            queries.push(query);
            values.push([]);
            const data = await database.get(queries, values);

            /* So sanh cac bien so xe voi bien so xe dau vao, neu bien so xe dau vao da ton tai 
                thi tra ve khong hop le va nguoc lai
            */
            for (let i = 0; i < data[0].length; i++) {
                if (data[0][i].number_plate === number_plate) {
                    resolve(false);
                }
            }
            resolve(true);
        } catch (err) {
            reject(err.message);
        }
    });
}

  
module.exports = DatabaseUpdate;
const database = require('../common/NDODatabase');

class DatabaseUpdate {
   constructor(DatabaseUpdate) {
   }

   static async registrationUpdate(data, result) {
        let registrations = data.registrations;
        let results = [];
        // console.log(registrations.length);
        for (let i = 0; i < registrations.length; i++) {
            let number_plate = await registrations[i].number_plate;
            let check = await numberPlateCheck(number_plate);
            if (check === true) {
                let queries = [];
                let values = [];
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
                await database.set(queries, values)
                .then((res) => {
                    results.push(true);
                })
                .catch((err) => {
                    console.log(i);
                    results.push(err.message);
                })
            } else {
                results.push(check);
            }
        }
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

async function numberPlateCheck(number_plate) {
    return new Promise(async (resolve, reject) => {
        try {
            let queries = [];
            let values = [];

            let query = "SELECT * FROM registration_information";
            queries.push(query);
            values.push([]);

            const data = await database.get(queries, values);
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
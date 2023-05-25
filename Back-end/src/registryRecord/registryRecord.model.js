const database = require('../common/NDODatabase');

class RegistryRecord {
    constructor() {}

    // Ham xu ly thong tin dang kiem
    static async registryUpdate(data, result) {
        // Lay thong tin xe duoc dang kiem
        let registration_number = data.registration_number;
        let number_plate = data.number_plate;
        let owner_name = data.owner_name;
        let owner_id = data.owner_id;
        let date_issued = data.date_issued;
        let date_expired = data.date_expired;
        let center_name = data.center_name;
        let center_id = data.center_id;
        let registry_code = data.registry_code;

        // Cap nhat thong tin dang kiem vao co so du lieu
        let queries = [];
        let values = []
        let query = "insert into registration_information (registration_number, number_plate, owner_name, owner_id, date_issued, date_expired, center_name, center_id, registry_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let value = [registration_number, number_plate, owner_name, owner_id, date_issued, date_expired, center_name, center_id, registry_code];
        queries.push(query);
        values.push(value);

        database.set(queries, values)
        .then((res) => {
            // Truong hop cap nhat thanh cong
            result({result: true});
        })
        .catch((err) => {
            // Truong hop xay ra loi
            result({result: false, error: err.message});
        });
    }
}

module.exports = RegistryRecord;
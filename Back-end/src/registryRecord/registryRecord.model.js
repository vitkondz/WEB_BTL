const database = require('../common/NDODatabase');

class RegistryRecord {
    constructor(registryRecord) {}
    static async registryUpdate(data, result) {
        let queries = [];
        let values = []

        let registration_number = data.registration_number;
        let number_plate = data.number_plate;
        let owner_name = data.owner_name;
        let owner_id = data.owner_id;
        let date_issued = data.date_issued;
        let date_expired = data.date_expired;
        let center_name = data.center_name;
        let center_id = data.center_id;
        let registry_code = data.registry_code;
        let query = "insert into registration_information (registration_number, number_plate, owner_name, owner_id, date_issued, date_expired, center_name, center_id, registry_code) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let value = [registration_number, number_plate, owner_name, owner_id, date_issued, date_expired, center_name, center_id, registry_code];
        queries.push(query);
        values.push(value);
        database.set(queries, values)
        .then((res) => {
            result({result: true});
        })
        .catch((err) => {
            result({result: false, error: err.message});
        });
    }
}

module.exports = RegistryRecord;
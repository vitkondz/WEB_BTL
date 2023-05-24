const database = require('../common/NDODatabase');

class AccountChange {
    static userUpdate(data, result) {
        let queries = [];
        let values = [];

        let center_id = data.center_id;
        let newCenterName = data.center_name;
        let newProvince = data.province;
        let newArea = data.area;
        let query = "update center_information set center_name=?, province=?, area=? where center_id = ?";
        let value = [newCenterName, newProvince, newArea, center_id];
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

module.exports = AccountChange;
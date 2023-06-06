const database = require('../common/NDODatabase');

class UserAccountDelete {
    constructor() {};
    
    // Ham xu ly xoa tai khoan trung tam
    static async accountDelete(unit_id, result) {
        let queries = [];
        let values = [];
        let query = "delete from account_list where unit_id = ?";
        let value = [unit_id];
        queries.push(query);
        values.push(value);

        database.set(queries, values)
        .then((res) => {
            result({result: true});
        })
        .catch((err) => {
            result({result: false});
        })
    }

}

module.exports = UserAccountDelete;
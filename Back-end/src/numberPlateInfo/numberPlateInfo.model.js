const database = require("../common/NDODatabase");

class NumberPlateInfo {
    constructor() {};

    // Ham lay tat ca thong tin bien so xe
    static async numberPlateGetAll(result) {
        let queries = [];
        let values = [];
        let query = "select number_plate from car_information";
        let value = [];
        queries.push(query);
        values.push(value);

        database.get(queries, values)
        .then((res) => {
            // Truong hop lay tat ca thong tin bien so xe thanh cong
            let numberPlates = res[0];
            result({result: numberPlates});
        })
        .catch((err) => {
            // Truong hop xay ra loi
            result({result: false, error: err.message});
        })
    }
}

module.exports = NumberPlateInfo;
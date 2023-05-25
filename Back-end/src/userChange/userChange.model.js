const database = require('../common/NDODatabase');

class AccountChange {
    constructor() {}

    // Ham cap nhat thong tin nguoi dung
    static userUpdate(data, result) {
        // Thong tin nguoi dung moi
        let center_id = data.center_id;
        let newCenterName = data.center_name;
        let newProvince = data.province;
        let newArea = data.area;
        let newContactNumber = data.contact_number;
        let newEmail = data.email;
        let newAddress = data.address;

        // Cap nhat thong tin nguoi dung vao co so du lieu thong tin trung tam va thong tin dang kiem
        let queries = [];
        let values = [];

        let query1 = "update center_information set center_name=?, province=?, area=?, contact_number=?, email=?, address=? where center_id=?";
        let value1 = [newCenterName, newProvince, newArea, newContactNumber, newEmail, newAddress, center_id];
        queries.push(query1);
        values.push(value1);

        let query2 = "update registration_information set center_name=? where center_id=?";
        let value2 = [newCenterName, center_id];
        queries.push(query2);
        values.push(value2);

        database.set(queries, values)
        .then((res) => {
            // Truong hop cap nhat thanh cong
            result({result: true});
        })
        .catch((err) => {
            // Truong hop cap nhat that bai
            result({result: false, error: err.message});
        });
    }
}

module.exports = AccountChange;
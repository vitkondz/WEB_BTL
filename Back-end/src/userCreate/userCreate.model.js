const database = require('../common/NDODatabase');
const bcrypt = require('bcrypt');
const saltRounds = 10;

class UserCreate {
    constructor() {}

    // Ham tao nguoi dung
    static async userCreate(data, result) {
        // Mang cac cau lenh truy van va cac gia tri tuong ung
        let queries = [];
        let values = [];

        // Thong tin trung tam moi va cau lenh cap nhat du lieu trung tam
        let newCenter = [
            data.center_id,
            data.center_name,
            data.province,
            data.area,
            data.contact_number,
            data.email,
            data.address
        ];
        let query1 = "INSERT INTO center_information (center_id, center_name, province, area, contact_number, email, address) values (?, ?, ?, ?, ?, ?, ?)";
        queries.push(query1);
        values.push(newCenter);

        // Ma hoa mat khau
        bcrypt.hash(data.password, saltRounds, function (err, hash) {
            if (err) {
                // Truong hop xay ra loi do ham ma hoa
                result({result: false, error: err.message});
            } else {
                // Thong tin tai khoan trung tam moi va cau lenh cap nhat du lieu tai khoan
                let newAccount = [
                    data.account,
                    hash,
                    "user",
                    data.center_id
                ];
                let query2 = "INSERT INTO account_list (account, password, type_of_account, unit_id) values (?, ?, ?, ?)";
                queries.push(query2);
                values.push(newAccount);

                // Cap nhat du lieu trung tam va thong tin tai khoan
                database.set(queries, values)
                .then(() => {
                    // Truong hop cap nhat thanh cong
                    result({ result: true });
                })
                .catch((err) => {
                    // Truong hop cap nhat that bai
                    result({result: false, error: err.message});
                })
            }
        });
    }
}

module.exports = UserCreate;
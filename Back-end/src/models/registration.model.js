const NDODatabase = require('../common/NDODatabase');

class Registration {
    constructor(registration) {
    }
    //Kiểm tra biển số xe đã tồn tại hay chưa
    static checkRegistrationValid(data, result) {
        Registration.getAll(function (message) {
            let registrationDatabase = message.result;
            if (registrationDatabase == false) {
                result(false);
            }
            else {
                for (let i = 0; i < registrationDatabase.length; i++) {
                    if (registrationDatabase[i].number_plate === data.number_plate) {
                        result(false);
                    }
                }
            }
            result(true);
        });
    }
    
    static getAll(result) {
        let database = new NDODatabase();

        database.get("SELECT * FROM registration_information", []).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static getById(id, result) {
        let database = new NDODatabase();
        
        database.get("select * from registration_information where registration_number = ?", [id]).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static getByCenterId(center_id, result) {
        let database = new NDODatabase();
        
        database.get("select * from registration_information where center_id =?", [center_id]).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static create(data, result) {
        let database = new NDODatabase();
        let values = [data.number_plate, data.owner_name, data.owner_id, date.date_issued, data.date_expired, data.center_name, data.center_id, data.status];
        
        database.set("INSERT into registration_information (number_plate, owner_name, owner_id, date_issued, date_expired, center_name, center_id, status) values (?, ?, ?, ?, ?, ?, ?, ?)", 
        values).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }

    static update(data, result) {
        let database = new NDODatabase();
        let values = [data.number_plate, data.owner_name, data.owner_id, date.date_issued, data.date_expired, data.center_name, data.center_id, data.status, data.registration_number];
        
        database.set("UPDATE registration_information SET number_plate=?, owner_name=?, owner_id=?, date_issued=?, date_expired=?, center_name=?, center_id=?, status=? where registration_number=?", values).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }

    static delete(data, result) {
        let database = new NDODatabase();
        
        database.set("DELETE from registration_information where registration_number=?", [data]).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }
}

module.exports = Registration;
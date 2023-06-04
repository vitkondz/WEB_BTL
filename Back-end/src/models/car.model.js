const NDODatabase = require("../common/NDODatabase");

class Car {
    constructor(car) {
    }

    static getAll(result) {
        let database = new NDODatabase();

        database.get("SELECT * from car_information", []).then((data) => {
            result({result: data});
        }).catch((err => {
            result({result: false});
        }))
    }

    static getByNumberPlate(number_plate, result) {
        let database = new NDODatabase();

        database.get("SELECT * from car_information where number_plate =?", [number_plate]).then((data) => {
            result({result: data});
        }).catch((err => {
            result({result: false});
        }))
    }

    static getByRegistrationNumber(registration_number, result) {
        let database = new NDODatabase();

        database.get("SELECT * from car_information where registration_number =?", [registration_number]).then((data) => {
            result({result: data});
        }).catch((err => {
            result({result: false});
        }))
    }

    static create(data, result) {
        let database = new NDODatabase();
        let values = [data.number_plate, data.car_name, data.province, data.date_registered, data.brand, data.purpose_of_use, data.owner_name, data.owner_id];

        database.set("INSERT into car_information (number_plate, car_name, province, date_registered, brand, purpose_of_use, owner_name, owner_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
        values).then(() => {
            result({result: true});
        }).catch((err => {
            result({result: false});
        }))
    }

    static update(data, result) {
        let database = new NDODatabase();
        let values = [data.number_plate, data.car_name, data.province, data.date_registered, data.brand, data.purpose_of_use, data.owner_name, data.owner_id, data.registration_number];
        
        database.set("UPDATE car_information SET number_plate=?, car_name=?, province=?, date_registered, brand=?, purpose_of_use=?, owner_name=?, owner_id=? WHERE registration_number=?", values).then(() => {
            result({result: true});
        }).catch((err => {
            result({result: false});
        }))
    }

    static delete(registration_number, result) {
        let database = new NDODatabase();

        database.set("DELETE FROM car_information WHERE registration_number=?", [registration_number]).then(() => {
            result({result: true});
        }).catch((err => {
            result({result: false});
        }))
    }
}

module.exports = Car;
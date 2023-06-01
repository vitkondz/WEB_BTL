const NDODatabase = require('../common/NDODatabase')

class Owner {
    constructor(owner) {
    }
    
    static getAll(result) {
        let database = new NDODatabase();

        database.get('SELECT * FROM owner_information', []).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static getById(owner_id, result) {
        let database = new NDODatabase();

        database.get("SELECT * FROM owner_information WHERE owner_id =?", [owner_id]).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static getByRegistrationNumber(registration_number, result) {
        let database = new NDODatabase();

        database.get("SELECT * FROM owner_information WHERE registration_number =?", [registration_number]).then((data) => {
            result({result: data});
        }).catch((err) => {
            result({result: false});
        })
    }

    static create(data, result) {
        let database = new NDODatabase();
        let values = [data.owner_name, data.type_of_ownership, data.owner_address, data.contact_number, data.owner_id];
        
        database.set("INSERT into owner_information (owner_name, type_of_ownership, owner_address, contact_number, owner_id) values (?, ?, ?, ?, ?)", 
        values).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }

    static update(data, result) {
        let database = new NDODatabase();
        let values = [data.owner_name, data.type_of_ownership, data.owner_address, data.contact_number, data.registration_number, data.owner_id];
        
        database.set("UPDATE owner_information SET owner_name=?, type_of_ownership=?, owner_address=?, contact_number=?, registration_number=? WHERE owner_id =?", values).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }

    static delete(registration_number, result) {
        let database = new NDODatabase();
        
        database.set("DELETE FROM owner_information WHERE registration_number =?", [registration_number]).then(() => {
            result({result: true});
        }).catch((err) => {
            result({result: false});
        })
    }
}







module.exports = Owner;
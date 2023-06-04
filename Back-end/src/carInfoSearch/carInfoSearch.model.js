const database = require('../common/NDODatabase');

class CarInfoSearch {
    constructor() {}

    // Ham xu li tim kiem bien so xe 
    static async infoSearch(number_plate, result) {
        // lay thong tin xe tu bien so
        let queries = [];
        let values = [];
        let query = "select * from car_information where number_plate = ?";
        let value = [number_plate];
        queries.push(query);
        values.push(value);

        database.get(queries, values)
        .then(async (res) => {
            let car = res[0][0];

            //Lay thong tin dang kiem va thong tin chu so huu tu ma dang ky
            let registration_number = car.registration_number;

            let queries = [];
            let values = [];

            let query1 = "select * from registration_information where registration_number = ?";
            let value1 = [registration_number];
            queries.push(query1);
            values.push(value1);

            let query2 = "select * from owner_information where registration_number = ?";
            let value2 = [registration_number];
            queries.push(query2);
            values.push(value2);

            database.get(queries, values)
            .then((res) => {
                //Truong hop tim kiem thanh cong

                // Tim thong tin dang kiem xe moi nhat
                let date_expired = false;
                let dates_expired = res[0];
                let max_date_expired = false;
                for (let i = 0; i < dates_expired.length; i++) {
                    let tam = dates_expired[i].date_expired;
                    let day = tam.slice(0, 2);
                    let month = tam.slice(3, 5);
                    let year = tam.slice(6, 10);

                    let date = new Date(year, parseInt(month) - 1, day);
                    if (max_date_expired === false) {
                        max_date_expired = date;
                        date_expired = tam;
                    } else if (date > max_date_expired) {
                        max_date_expired = date;
                        date_expired = tam;
                    }
                }

                // Thong tin chu so huu
                let owner = res[1][0];
                result({result: true, car: car, date_expired: date_expired, owner: owner});
            })
            .catch((err) => {
                //Truong hop xay ra loi tim kiem dang kiem, chu so huu
                result({result: false, error: err.message})
            })
        })
        .catch((err) => {
            //Truong hop xay ra loi tim kiem xe
            result({result: false, error: err.message});
        })
    }
}

module.exports = CarInfoSearch;
// Ham tim thong tin dang kiem, xe o to, chu so huu theo bien so xe
async function numberPlateSearch(number_plate, registrations, cars, owners) {
    let registration_number = "100001";
    let car = {};
    for (let i = 0; i < cars.length; i++) {
        if (cars[i].number_plate === number_plate) {
            registration_number = cars[i].registration_number;
            car = cars[i];
            break;
        }
    }
    let date_expired = false;
    for (let i = 0; i < registrations.length; i++) {
        if (registrations[i].registration_number === registration_number) {
            if (date_expired === false) { 
                date_expired = registrations[i].date_expired;
            } else {
                let d1 = registrations[i].date_expired.slice(0, 2);
                let m1 = registrations[i].date_expired.slice(3, 5);
                let y1 = registrations[i].date_expired.slice(6, 10);

                let d2 = date_expired.slice(0, 2);
                let m2 = date_expired.slice(3, 5);
                let y2 = date_expired.slice(6, 10);

                let t1 = new Date(d1, parseInt(m1) -1, y1);
                let t2 = new Date(d2, parseInt(m2) -1, y2);

                if (t1.getTime > t2.getTime) {
                    date_expired= registrations[i].date_expired;
                }
            }
        }
    }

    let owner = {};
    for (let i = 0; i < owners.length; i++) {
        if (owners[i].registration_number === car.registration_number) {
            owner = owners[i];
            break;
        }
    }

    return {car: car, date_expired: date_expired, owner: owner};
}

module.exports = numberPlateSearch;
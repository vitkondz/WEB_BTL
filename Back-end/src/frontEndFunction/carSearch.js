// Ham tim xe o to theo ma dang ky bien so xe
async function carSearch(cars, registration_number) {
    let left = 0;
    let right = cars.length -1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (cars[mid].registration_number === registration_number) {
            return cars[mid];
        } else {
            if (cars[mid].registration_number < registration_number) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return {registration_number: registration_number, car: "unknown"};
}

module.exports = carSearch;
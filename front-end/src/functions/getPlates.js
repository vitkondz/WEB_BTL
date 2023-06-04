async function getPlates(cars) {
    let plates = [];
    for (let i = 0; i < cars.length; i ++) {
        let plate = cars[i].number_plate;
        plates.push(plate);
    }
    return plates;
}

module.exports = getPlates;
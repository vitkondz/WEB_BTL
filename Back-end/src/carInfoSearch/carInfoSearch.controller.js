let carInfoSearchModel = require('./carInfoSearch.model');

exports.dataGet =  async function(req, res) {
    // Lay du lieu tu request tim bien so xe
    let number_plate = await req.params.number_plate;

    // Goi ham xu ly request tim bien so xe
    carInfoSearchModel.infoSearch(number_plate, function(response) {
        res.send(response);
    });
}
let registryForecastModel = require('./registryForecast.model');

exports.dataGet = async function (req, res) {
    // Lay du lieu tu request du bao so luong xe dang kiem moi va dang kiem lai
    let data = req.body;

    // Goi ham xu ly request du bao so luong xe dang kiem moi va dang kiem lai
    registryForecastModel.registryForecast(data, function (response) {
        res.send(response);
    })
}
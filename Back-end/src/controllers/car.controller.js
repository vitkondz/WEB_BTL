const Car = require('../models/car.model');

exports.getAll = function(req, res) {
    Car.getAll(function(response){
        res.send(response);
    })
}

exports.getByNumberPlate = function(req, res) {
    Car.getByNumberPlate(req.params.number_plate, function(response){
        res.send(response);
    })
}

exports.getByRegistrationNumber = function(req, res) {
    Car.getByRegistrationNumber(req.params.registration_number, function(response){
        res.send(response);
    })
}

exports.create = function(req, res) {
    let data = req.body;
    Car.create(data, function(response){
        res.send(response);
    })
}

exports.update = function(req, res) {
    let data = req.body;
    Car.update(data, function(response){
        res.send(response);
    })
}

exports.delete = function(req, res) {
    Car.delete(req.params.resgistration_number, function(response){
        res.send(response);
    })
}
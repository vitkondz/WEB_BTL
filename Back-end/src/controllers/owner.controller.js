let Owner = require('../models/owner.model');

exports.getAll = function (req, res) {
    Owner.getAll(function(response){
        res.send(response);
    })
}

exports.getById = function (req, res) {
    Owner.getById(req.params.id, function(response) {
        res.send(response);
    })
}

exports.getByRegistrationNumber = function (req, res) {
    Owner.getByRegistrationNumber(req.params.registration_number, function(response) {
        res.send(response);
    })
}

exports.create = function (req, res) {
    let data = req.body;
    Owner.create(data, function(response) {
        res.send(response);
    })
}

exports.update = function (req, res) {
    let data = req.body;
    Owner.update(data, function(response) {
        res.send(response);
    })
}

exports.delete = function (req, res) {
    Owner.delete(req.params.registration_number, function(response) {
        res.send(response);
    })
}
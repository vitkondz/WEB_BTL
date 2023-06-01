let Registration = require('../models/registration.model');

exports.getAll = function(req, res) { 
    Registration.getAll(function(response) {
        res.send(response);
    })
}

exports.getById = function(req, res) {
    Registration.getById(req.params.id, function(response) {
        res.send(response);
    })
}

exports.getByCenterId = function(req, res) {
    Registration.getByCenterId(req.params.center_id, function(response) {
        res.send(response);
    })
}

exports.create = function(req, res) {
    let data = req.body;
    Registration.create(data, function(response) {
        res.send(response);
    })
}

exports.update = function(req, res) {
    let data = req.body;
    Registration.update(data, function(response) {
        res.send(response);
    })
}

exports.delete = function(req, res) {
    Registration.delete(req.params.id, function(response) {
        res.send(response);
    })
}
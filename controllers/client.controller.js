const Client = require("../models/client.model.js");

// Create and Save a new Client
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    // Create a Client
    const client = new Client({
        email: req.body.email,
        name: req.body.name,
        active: req.body.active,
    });

    // Save Client in the database
    Client.create(client, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the clients.",
            });
        else res.send(data);
    });
};

// Retrieve all Clients from the database.
exports.findAll = (req, res) => {
    Client.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving customers.",
            });
        else res.send(data);
    });
};

// Find a single Client with a customerId
exports.findOne = (req, res) => {
    Client.findById(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.customerId}.`,
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Client with id " + req.params.customerId,
                });
            }
        } else res.send(data);
    });
};

// Update a Client identified by the customerId in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!",
        });
    }

    Client.updateById(
        req.params.customerId,
        new Client(req.body),
        (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found Client with id ${req.params.customerId}.`,
                    });
                } else {
                    res.status(500).send({
                        message: "Error updating Client with id " + req.params.customerId,
                    });
                }
            } else res.send(data);
        }
    );
};

// Delete a Client with the specified customerId in the request
exports.delete = (req, res) => {
    Client.remove(req.params.customerId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Client with id ${req.params.customerId}.`
                });
            } else {
                res.status(500).send({
                    message: "Could not delete Client with id " + req.params.customerId
                });
            }
        } else res.send({ message: `Client was deleted successfully!` });
    });

};
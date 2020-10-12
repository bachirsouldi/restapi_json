module.exports = app => {
    const clients = require("../controllers/client.controller.js");

    // Create a new Client
    app.post("/clients", clients.create);

    // Retrieve all Clients
    app.get("/clients", clients.findAll);

    // Retrieve a single Client with customerId
    app.get("/clients/:customerId", clients.findOne);

    // Update a Client with customerId
    app.put("/clients/:customerId", clients.update);

    // Delete a Client with customerId
    app.delete("/clients/:customerId", clients.delete);

    // Create a new Client
};
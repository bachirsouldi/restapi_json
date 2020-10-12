const sql = require("./db.js");

// constructor
const Client = function(clients) {
  this.email = clients.email;
  this.name = clients.name;
  this.active = clients.active;
};

Client.create = (newClient, result) => {
  sql.query("INSERT INTO clients SET ?", newClient, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created clients: ", { id: res.insertId, ...newClient });
    result(null, { id: res.insertId, ...newClient });
  });
};

Client.findById = (clientsId, result) => {
  sql.query(`SELECT * FROM clients WHERE id = ${clientsId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found clients: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Client with the id
    result({ kind: "not_found" }, null);
  });
};

Client.getAll = result => {
  sql.query("SELECT * FROM clients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("clients: ", res);
    result(null, res);
  });
};

Client.updateById = (id, clients, result) => {
  sql.query(
    "UPDATE clients SET email = ?, name = ?, active = ? WHERE id = ?",
    [clients.email, clients.name, clients.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found client with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated clients: ", { id: id, ...clients });
      result(null, { id: id, ...clients });
    }
  );
};

Client.remove = (id, result) => {
  sql.query("DELETE FROM clients WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Client with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted clients with id: ", id);
    result(null, res);
  });
};

Client.removeAll = result => {
  sql.query("DELETE FROM clients", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} clients`);
    result(null, res);
  });
};

module.exports = Client;
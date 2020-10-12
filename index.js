const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, resp) => {
  resp.json({ message: "message from node" });
});

require("./routes/client.routes.js")(app);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

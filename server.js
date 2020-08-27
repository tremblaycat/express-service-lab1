//req the express mod
const express = require("express");
const e = require("express");

//creates an express app so we can create and use APIs
const app = express();

//allow json req bodies for PUT and POST
app.use(express.json());

//defines the port
const port = 3200;

//run the server
app.listen(port, () => console.log(`Listening on port: ${port}.`));

//linking the routes
const { routes } = require("./routes");
app.use("/", routes);

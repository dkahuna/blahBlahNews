// dependencies

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const logger = require("morgan");

// initializing the Express app method
const express = require("express");
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(process.cwd() + "/public"));
// Require set up for handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// connecting to MongoDB

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/blahBlah_News";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function () {
    console.log("Connected to Mongoose!");
});

const routes = require("./controller/controller.js");

app.use("/", routes);

const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("Listening on PORT " + port);
});


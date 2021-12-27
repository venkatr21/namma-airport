const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const compression = require('compression');
const path = require('path');
const config = require('config');

const app = express();

// middleware setup
app.use(bodyParser.json());     //usage of body parser
app.use(cors());                //allow cross origin reference
app.use(compression());         //compress all the route responses

// DB configuration
const mongoConnectionString = config.get('AzureCosmosMongoConnectionString');

// database connection
mongoose.connect(mongoConnectionString, { useUnifiedTopology: true, useNewUrlParser: true})
    .then(()=> console.log("Connected to mongoDB"))
    .catch(err => console.log(err));

// Setting up the routes
const users = require(path.join(__dirname, 'routes','api','users'));
const messages = require(path.join(__dirname, 'routes','api','messages'));
const search = require(path.join(__dirname, 'routes','api','search'));

// Using the routes
app.use("/users", users);
app.use("/messages", messages);
app.use("/search", search);

// port for connection
const port = process.env.PORT || 5000;

// listen for connection
app.listen(port, () => console.log("Server started at "+port));

app.get("*",(req,res)=>{
    res.json({"server": "NammaAirport"})
})
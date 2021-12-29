const express = require("express");
const cors = require('cors');
const path = require('path');
const config = require('config');
const dotenv = require('dotenv')
const server = express();

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

server.use(cors());                //allow cross origin reference

const {
    CloudAdapter,
    ConfigurationServiceClientCredentialFactory,
    createBotFrameworkAuthenticationFromConfiguration
} = require('botbuilder');

const { DispatchBot } = require('./bots/dispatchBot');

// Using the routes
//app.use("/users", users);
//app.use("/messages", messages);
//app.use("/search", search);
//app.use("/poi", poi);

// port for connection
const port = process.env.PORT || 5000;

// listen for connection
server.listen(port, () => console.log("Server started at "+port));

server.get("*",(req,res)=>{
    res.json({"server": "NammaAirport"})
})
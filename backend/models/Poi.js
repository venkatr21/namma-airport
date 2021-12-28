const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for places data
const poiSchema = new Schema({
    name:{ type: String, required: true},
    description:{ type: String, required: true},
    type: {type: String, required: false},
    phoneNumbers:{ type: [String], required: false},
    image:{ type: String, required: false},
    location: {type: String, required: false},
    contactName:{ type: String, required: false},
    contactEmail: {type: String, required: false},
},{ timestamps: true });

module.exports = mongoose.model('poi', poiSchema);
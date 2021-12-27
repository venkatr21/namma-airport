const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for search data
const searchSchema = new Schema({
    email:{ type: String, required: true},
    search: {type: String, required: true},
},{ timestamps: true });

module.exports = mongoose.model('searches', searchSchema);
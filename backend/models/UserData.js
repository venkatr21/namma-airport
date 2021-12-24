const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for user data
const userSchema = new Schema({
    id:{ type: String, required: true},
    email:{ type: String, required: true},
    name: {type: String, required: true},
    givenName:{ type: String, required: false},
    familyName:{ type: String, required: false},
    photo: {type: String, required: false}
},{ timestamps: true });

module.exports = mongoose.model('users', userSchema);
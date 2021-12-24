const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for user data
const userSchema = new Schema({
    userId:{ type: String, required: true},
    email:{ type: String, required: true},
    fullName: {type: String, required: true},
    firstName:{ type: String, required: false},
    lastName:{ type: String, required: false},
    photoUri: {type: String, required: false}
},{ timestamps: true });

module.exports = mongoose.model('users', userSchema);
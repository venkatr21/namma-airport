const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// creating a schema for User Messages

const User = new Schema({
    _id: { type: String, required: true},
    name: { type: String, required: true},
    avatar: { type: String, required: true}
});

const Reply = new Schema({
    title: { type: String, required: true},
    value: { type: String, required: true},
    messageId: { type: String, required: false}
});

const QuickReplies = new Schema({
    type: { type: String, enum: ['radio','checkbox'], required: true},
    values: { type: [Reply], required: true},
    keepIt: { type: Boolean, required: true}
});

const messageSchema = new Schema({
    _id: {type: String, required: true},
    email: {type: String, required: true},
    text: { type: String, required: true},
    createdAt: {type: Date, required: true},
    user: {type: User, required: true},
    image: { type: String, required: false},
    video: { type: String, required: false},
    audio: { type: String, required: false},
    system: { type: Boolean, required: false},
    send: { type: Boolean, required: false},
    received: { type: Boolean, required: false},
    pending: { type: Boolean, required: false},
    quickReplies: { type: QuickReplies, required: false}
},{ timestamps: true });

module.exports = mongoose.model('messages', messageSchema);
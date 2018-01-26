const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema,
      ObjectId = Schema.ObjectId;


const memoSchema = new Schema({
    userID: {type: ObjectId, require: true},
    tagID: {type: [Number], require: true, default: [0]},
    name: {type: String},
    content: {type: String,require: true},
    isPublic: {type: Boolean, default: true},
    created_at: {type: Date, default: Date.now()}
});


const Memo = mongoose.model('Memo', memoSchema);
module.exports = Memo;

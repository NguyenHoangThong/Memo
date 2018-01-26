const mongoose = require('mongoose');

let Tag = new mongoose.Schema({
    tagID: {type: Number, required: true, unique: true},
    name: {type: String, required: true}
});

module.exports = mongoose.model('Tag', Tag);
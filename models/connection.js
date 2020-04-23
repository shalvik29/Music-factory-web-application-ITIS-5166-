var mongoose = require('mongoose');

var connectionSchema = new mongoose.Schema({
    Id : {type: Number},
    Name : {type: String},
    topic : {type: String},
    details : {type: String},
    date : {type: String},
    time : {type: String},
    location : {type: String}
});

var counterSchema = new mongoose.Schema({
    _id: {type: String},
    sequenceValue: {type: Number},
    sequence_value: {type: Number}
});

var Connection = mongoose.model('connection', connectionSchema);

var Counter = mongoose.model('counter',counterSchema);


module.exports.Connection = Connection;
module.exports.Counter = Counter;
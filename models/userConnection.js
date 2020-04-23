var mongoose = require('mongoose');

var userConnectionSchema = new mongoose.Schema({
    connectionId: {type: Number, unique: true},
    userId: {type: Number, unique: true},
    connectionName: {type: String},
    category: {type: String},
    rsvp: {type: String}
});

var userevents = mongoose.model('userevents',userConnectionSchema);

module.exports.userevents = userevents;
var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String}
});

var Users = mongoose.model('users',userSchema);

module.exports.Users = Users;
var userProfile = require('../models/userProfile');
var user = require('../models/user');
var userConnection = require('../models/userConnection');

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    userId: {type: Number},
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String}
});

var Users = mongoose.model('users',userSchema);

// Loading all hardcoded users when the user signs in
async function getUsers(){
     var allUsers = await Users.find({}, (err, data) => {
            console.log('All Users'+JSON.stringify(data));
            if(err)
                console.error(err);
            return data;
     })
     return allUsers;
 }

module.exports = {getUsers};


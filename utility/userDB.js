var userProfile = require('../models/userProfile');
var user = require('../models/user');
var userConnection = require('../models/userConnection');

var user1 = new user.user(1, "Raj","Shah","rajshah1298@gmail.com");
var user2 = new user.user(2, "Sharvil","Patel","patel25@gmail.com");

var allUsers = [user1, user2];

userConnection1 = new userConnection.userConnection(1,"Coldplay", "Concerts", "Yes");
userConnection2 = new userConnection.userConnection(4, "Super Grit Cowboy", "Live bands", "No");

userConnection3 = new userConnection.userConnection(2, "Taylor Swift", "Concerts", "Yes");
userConnection4 = new userConnection.userConnection(5, "Acoustic Syndicate", "Live bands", "May be");

user1.userProfile = new userProfile.userProfile(1, [userConnection1, userConnection2]);
user2.userProfile = new userProfile.userProfile(2, [userConnection3, userConnection4]);

var getUsers = function(){
    return allUsers;
}

module.exports = {getUsers};


var connectionObj = require('./connectionDB');
var userObj = require('./userDB');
var userConnection = require('../models/userConnection');
var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session({
    secret: 'userSession',
    cookie: { secure: true }
}));

var addConnections = (connectionId, rsvp, userConnections) => {

    var connection = connectionObj.getConnectionById(connectionId);
    console.log("connection: "+connection);
    var newConnection = new userConnection.userConnection(connection.Id, connection.Name, connection.topic, rsvp);
    console.log(`Connection with id ${connectionId} added to the user profile`);
    userConnections.push(newConnection);
    return userConnections;
}

var removeConnections = function (connectionId, userConnections) {

    console.log(`Connection with id ${connectionId} removed from the user profile`);
    for (var i = userConnections.length - 1; i >= 0; i--) {
        if (userConnections[i].connectionId === connectionId) {
            userConnections.splice(i, 1);
        }
    }
    return userConnections;

}

var updateConnections = function (connectionId, rsvp, userConnections) {

    console.log(`Connection id ${connectionId} updated`);
    userConnections.forEach(element => {
        if (element.connectionId === connectionId) {
            element.rsvp = rsvp;
        }
    });

    return userConnections;
}

var getConnections = function () {

    var users = userObj.getUsers();

    // Choosing random user between 1 and 2 to present the corresponding hardcoded Connections under the userProfile for specific user
   // var userId = Math.round(Math.random());  

   // var registeredConnections = users[userId].userProfile.userConnection;

  //  console.log('Loading Users upon sign in' + JSON.stringify(registeredConnections));

    return users;
}

// Emptying the profile upon SignOut
var emptyProfile = function (sessionObj) {

    console.log(`Session object destroyed`);
    sessionObj.destroy();

}

// checking if the Connection is already registred and returns true if present / false if not
var checkConnectionRegistered = function (connectionId, userConnections) {

    var Connection = userConnections.find(x => x.connectionId === connectionId);

    if (Connection == null || Connection == undefined) {
        console.log('Selected Connection not present in user registered Connections');
        return false;
    }
    console.log('Selected Connection present in user registered Connections');
    return true;

}

module.exports = { emptyProfile, getConnections, updateConnections, removeConnections, addConnections, checkConnectionRegistered };

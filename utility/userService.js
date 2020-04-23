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

async function addConnections (connectionId, rsvp,userId) {
    console.log(userId);
    var connection = await connectionObj.getConnectionById(connectionId);
    console.log("connection: "+connection);
    await userConnection.addConnectionToUser(connection.Id, connection.Name, connection.topic, rsvp, userId);
    console.log(`Connection with id ${connectionId} added to the user profile`);
    var userRegisterConnections = await userProfileConnections(userId);
    console.log(userRegisterConnections);
    return userRegisterConnections;
}

async function removeConnections(connectionId, userId) {

    await userConnection.deleteUserProfileconnection(connectionId,userId);
    return userProfileConnections(userId);
}

async function updateConnections (connectionId, rsvp, userId, userConnections) {

    await userConnection.updateUserProfileconnections(connectionId,userId,rsvp);
    var userConnections = await userProfileConnections(userId);
    return userConnections;

}

async function getConnections () {

    var users = userObj.getUsers();
    console.log("users= "+users);
    return users;
}

async function signOut(sessionObj) {

    console.log(`Session object destroyed`);
    sessionObj.destroy();

}

async function userProfileConnections(userId){

    var connections = await userConnection.getUserProfileconnections(userId);
    console.log('Service Class'+JSON.stringify(connections));
    return connections;
}

async function checkConnectionRegistered ( connectionId, userConnection) {

    var connection = await userConnection.find(x => x.connectionId === connectionId);

    if (connection == null || connection == undefined) {
        console.log('Selected connection not present in user registered connections');
        return false;
    }
    console.log('Selected connection present in user registered connections');
    return true;
}

module.exports = { signOut, userProfileConnections, getConnections, updateConnections, removeConnections, addConnections, checkConnectionRegistered };

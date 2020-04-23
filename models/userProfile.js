var userConnection = require('./userConnection');

// Add connection to the User Profile i.e the Userconnection Collection
async function addConnectionToUser(connectionId, connectionName, Category, rsvp, userId){
    
    var addconnection = new userConnection.userevents({"connectionId": connectionId, "userId": userId, "connectionName": connectionName, "category": Category, "rsvp": rsvp});
    await addconnection.save();

}

// Updating the User Registered connections
async function updateUserProfileconnections(connectionId, userId, rsvp){
    
    await userConnection.userevents.update({"connectionId": connectionId,"userId":userId}, {$set : {rsvp: rsvp}}, (err, data) => {
        // console.log('User connection updated successfully'+JSON.stringify(data));
    });
}

// Deleting the connection from the User Profile
async function deleteUserProfileconnection(connectionId, userId){

        await userConnection.userevents.remove({userId: userId, connectionId: connectionId}, (err, data) => {
        // console.log(`$Deleted connection with ID:${connectionId} from the UserId:${userId}`);
    });
}

// Get the connections associated with the particular User Id
async function getUserProfileconnections(id){
    var userProfileconnections = await userConnection.userevents.find({userId:id}, (err, data) => { 
        // console.log("data: "+data); 
        return data;
    });

    return userProfileconnections;
}


module.exports = { getUserProfileconnections, addConnectionToUser, updateUserProfileconnections, deleteUserProfileconnection};
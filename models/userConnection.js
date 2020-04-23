var mongoose = require('mongoose');

var userConnectionSchema = new mongoose.Schema({
    connectionId: {type: Number, unique: true},
    userId: {type: Number, unique: true},
    connectionName: {type: String},
    category: {type: String},
    rsvp: {type: String}
});

var userevents = mongoose.model('userevents',userConnectionSchema);

// Add connection to the User Profile i.e the Userconnection Collection
async function addConnectionToUser(connectionId, connectionName, Category, rsvp, userId){
    console.log("print"+connectionId)
    var addconnection = new userevents({"connectionId": connectionId, "userId": userId, "connectionName": connectionName, "category": Category, "rsvp": rsvp});
    await addconnection.save();

}

// Updating the User Registered connections
async function updateUserProfileconnections(connectionId, userId, rsvp){
    console.log(userId+"connectttt"+JSON.stringify(connectionId));

    await userevents.update({"connectionId": connectionId,"userId":userId}, {$set : {rsvp: rsvp}}, (err, data) => {
        console.log('User connection updated successfully'+JSON.stringify(data));
    })


}

// Deleting the connection from the User Profile
async function deleteUserProfileconnection(connectionId, userId){

        await userevents.remove({userId: userId, connectionId: connectionId}, (err, data) => {
        console.log(`$Deleted connection with ID:${connectionId} from the UserId:${userId}`);
    });



}

// Get the connections associated with the particular User Id
async function getUserProfileconnections(id){
    // console.log("id: "+id);
    var userProfileconnections = await userevents.find({userId:id}, (err, data) => { 
        console.log("data: "+data); 
        return data;
    });

    return userProfileconnections;
}


module.exports = { getUserProfileconnections, addConnectionToUser, updateUserProfileconnections, deleteUserProfileconnection};
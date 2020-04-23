var connectionObj = require('../models/connection');

async function getAllCategories(){

    var categories = [];

    await connectionObj.Connection.find({}, {topic:1}, (err, data) => {

        data.forEach(x => {
            categories.push(x.topic);
        });
        return categories;
    });
    return Array.from(new Set(categories));
}

async function getAll(){
    var connection = await connectionObj.Connection.find({},(err, data) => {
        return data;
    })
    return connection;
}

async function getConnectionById(id){
    var connection  = await connectionObj.Connection.findOne({"Id": id}, (err, data) => {
        if(err){
            return err;
        }
       return data;
    })
    return connection;
}

async function addConnection(body){

    var connectionId = await connectionObj.Counter.findOne({sequenceValue : 0}, (err, data) => {
        return data;
    })

    var newConnectionId = parseInt(connectionId.sequence_value)+1;
    await connectionObj.Counter.update({sequenceValue : 0}, {$set : {sequence_value: newConnectionId}}, (err, data) => {
        console.log('Counter Increment Updated Successfully');
    });

    var addNewConnection = new connectionObj.Connection({"Id": newConnectionId, "Name": body.Name, "topic":body.topic, "location":body.location, "date": body.date, "time": body.time, "details":body.details});
    await addNewConnection.save();

 }

module.exports = { addConnection, getConnectionById, getAll, getAllCategories };
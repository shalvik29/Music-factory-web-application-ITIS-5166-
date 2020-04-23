var connectionObj = require('../models/connection');
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

async function getAllCategories(){

    var categories = [];

    var allConnections = await Connection.find({}, {topic:1}, (err, data) => {

        data.forEach(x => {
            categories.push(x.topic);
        });
        return categories;
    });
    return Array.from(new Set(categories));
}

async function getAll(){
    var connection = await Connection.find({},(err, data) => {
        return data;
    })
    return connection;
}

async function getConnectionById(id){
    var connection  = await Connection.findOne({"Id": id}, (err, data) => {
        if(err){
            return err;
        }
       return data;
    })
    return connection;
}

async function addConnection(body){

    var connectionId = await Counter.findOne({sequenceValue : 0}, (err, data) => {
        return data;
    })

    var newConnectionId = parseInt(connectionId.sequence_value)+1;
    await Counter.update({sequenceValue : 0}, {$set : {sequence_value: newConnectionId}}, (err, data) => {
        console.log('Counter Increment Updated Successfully');
    });

    var addNewConnection = new Connection({"Id": newConnectionId, "Name": body.Name, "topic":body.topic, "location":body.location, "date": body.date, "time": body.time, "details":body.details});
    await addNewConnection.save();

 }

module.exports = { addConnection, getConnectionById, getAll, getAllCategories };
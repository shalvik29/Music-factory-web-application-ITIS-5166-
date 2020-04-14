var connectionObj = require('../models/connection');

var connectionOne = new connectionObj.connection(1, "Coldplay", "Concerts", "Coldplay is a rock band with a team of Vocalist and pianist Chris Martin, guitarist Jonny Buckland, bassist Guy Berryman.", "24th Feb 2020", "1:00 am", "Hosted by St Martin");
var connectionTwo = new connectionObj.connection(2, "Taylor Swift", "Concerts", "Taylor Swift is an American singer-songwriter. She is known for narrative and attractive songs about her personal life.", "21th Feb 2020", "5:00 am", "Hosted by Lueis");
var connectionThree = new connectionObj.connection(3, "Drake", "Concerts", "Drake is a Canadian rapper, singer, songwriter, producer, actor, and businessman. His famous songs are God's Plan and In My Feelings", "26th Feb 2020", "6:30 am", "Hosted by Georgia");

var connectionFour = new connectionObj.connection(4, "Super Grit Cowboy", "Live bands", "Super Grit Cowboy Band is an American country music band formed in North Carolina. It was founded by Clyde Mattocks.", "01th Aug 2020", "10:30 am", "Hosted by Lutherking");
var connectionFive = new connectionObj.connection(5, "Acoustic Syndicate", "Live bands", "Acoustic Syndicate is a rock/folk/bluegrass band from North Carolina formed in 1992. They have toured nationally in the US.", "11th Dec 2019", "2:45 am", "Hosted by Shalvik");
var connectionSix = new connectionObj.connection(6, "Cry of love", "Live bands", "Cry of Love was an American rock band, formed in 1989 in Raleigh, North Carolina, United States. The group released their debut album in 1993.", "6th Jan 2019", "11:00 am", "Hosted by Raj");
var connectionSeven = new connectionObj.connection(7, "One direction", "Live bands", "One Direction, often shortened to 1D, it was a very famous English-Irish pop boy band formed in London, England in 2010.", "18th Jan 2019", "11:00 am", "Hosted by Khamosh");

var ConcertConnections = [connectionOne, connectionTwo, connectionThree];
// var LiveConnections = [connectionFour, connectionFive, connectionSix]; 
var LiveConnections = [connectionFour, connectionFive, connectionSix, connectionSeven]; 

var getConcertConnections = function() {
    return ConcertConnections;
} 

var getLiveConnections = function() {
    return LiveConnections;
} 
 

var getConnectionById = function(id) {
    if (id <= 3) {
        return ConcertConnections[id - 1];
    }
    return LiveConnections[id - LiveConnections.length ];
}

module.exports = { getConcertConnections, getConnectionById, getLiveConnections };
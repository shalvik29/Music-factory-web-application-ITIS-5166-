var express = require('express');
var router = express.Router();
var session = require('express-session');
var userProfile = require('../utility/userService');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

// List all connections from savedConnections page
router.get('/myConnections', (req, res) => {
    if (req.session.users == null || req.session.users == undefined) {
        req.session.users = userProfile.getConnections();

        var randomUser = Math.round(Math.random());

        req.session.userId = req.session.users[randomUser].userId;
        req.session.userName = req.session.users[randomUser].firstName;
        // console.log(`Id: ${req.session.userId} Name: ${req.session.userName}`);
        req.session.userEvents = req.session.users[randomUser].userProfile.userEvent;
        
        res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
    }
    else{
        res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
    }
});

// Add connection into savedConnections page
router.get('/save', (req, res) => {
    var id = parseInt(req.query.connectionId);
    var rsvp = req.query.rsvp;

    req.session.connectionId = id;
    req.session.rsvp = rsvp;
    if (req.session.userEvents == null || req.session.userEvents == undefined) {
        return res.redirect('/login');
    }
    var status = userProfile.checkConnectionRegistered(id, req.session.userEvents);

    if (status) {
        return res.redirect('./update');

    } else {
        req.session.userEvents = userProfile.addConnections(id, rsvp, req.session.userEvents);
    }
    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName});
});

// Update the connection with specific RSVP
router.get('/update', (req, res) => {
    req.session.userEvents = userProfile.updateConnections(req.session.connectionId, req.session.rsvp, req.session.userEvents);
    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
});

// Delete the connection from savedConnections page
router.get('/delete', (req, res) => {
    var id = parseInt(req.query.connectionId);
    // console.log(`Deleted id: ${id} with ${req.session.userEvents}`);
    req.session.userEvents = userProfile.removeConnections(id, req.session.userEvents);

    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
});

// Destroy session 
router.get('/signout', (req, res) => {
    userProfile.emptyProfile(req.session);
    return res.redirect('/index');
});

module.exports = router;
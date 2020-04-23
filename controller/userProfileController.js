var express = require('express');
var router = express.Router();
var session = require('express-session');
var userProfile = require('../utility/userService');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

// List all connections from savedConnections page
router.get('/myConnections', async (req, res) => {
    if (req.session.users == null || req.session.users == undefined) {
        
        req.session.users = await userProfile.getConnections();

        req.session.userId = req.session.users[0].userId;
        req.session.userName = req.session.users[0].firstName;
        
        console.log(`User Logged In with Id: ${req.session.userId} and Name: ${req.session.userName}`);

        // req.session.userEvents = req.session.users[randomUser].userProfile.userEvent;
        req.session.userEvents = await userProfile.userProfileConnections(req.session.userId);
        console.log("shah"+req.session.userEvents);
        res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
    }
    else{
        res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
    }
});

// Add connection into savedConnections page
router.get('/save', async(req, res) => {
    var id = parseInt(req.query.connectionId);
    var rsvp = req.query.rsvp;

    req.session.connectionId = id;
    req.session.rsvp = rsvp;
    if (req.session.userEvents == null || req.session.userEvents == undefined) {
        return res.redirect('/login');
    }
    var status = await userProfile.checkConnectionRegistered(id, req.session.userEvents);
    console.log("status"+status);
    if (status) {
        return res.redirect('./update');

    } else {
        console.log("userId::::"+req.session.userId);
        req.session.userEvents = await userProfile.addConnections(id, rsvp, req.session.userId, req.session.userEvents);
    }
    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName});
});

// Update the connection with specific RSVP
router.get('/update', async (req, res) => {
    req.session.userEvents = await userProfile.updateConnections(req.session.connectionId, req.session.rsvp, req.session.userId, req.session.userEvents);
    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
});

// Delete the connection from savedConnections page
router.get('/delete', async (req, res) => {
    var id = parseInt(req.query.connectionId);
    req.session.userEvents = await userProfile.removeConnections(id, req.session.userId, req.session.userEvents);

    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
});

// Destroy session 
router.get('/signout', (req, res) => {
    userProfile.signOut(req.session);
    return res.redirect('/index');
});

module.exports = router;
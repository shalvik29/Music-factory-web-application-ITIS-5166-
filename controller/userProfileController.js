var express = require('express');
var router = express.Router();
var session = require('express-session');
var userProfile = require('../utility/userService');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const { check, validationResult } = require('express-validator');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

router.get('/login', urlEncodedParser, [
    check('action').equals('signIn').withMessage('Please use the form to login.. SignIn attribute not set'),
    check('username').custom((value, { req }) => {
        return userProfile.getUserByEmail(value).then(user => {
            // console.log("uuuuuu"+user);
            if (user === null || user === undefined) {
                throw new Error('Username does not match with records');
            } else if (user.email !== req.query.username || user.password !== req.query.password) {
                throw new Error('Username and Password combination does not match with records');
            }
        })
        
    })
], async(req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.render('login', { loggedIn: (req.session.users) ? true : false, errors: errors.array() });
    }else{

        req.session.users = await userProfile.getUserByEmail(req.query.username);

        req.session.userId = req.session.users.userId;
        req.session.userName = req.session.users.firstName;

        req.session.userEvents = await userProfile.userProfileConnections(req.session.userId);
        
        res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
    }

});

// Show connections
router.get('/myConnections', async (req, res) => {
    res.render('savedConnections', { userEvents: req.session.userEvents, userName: req.session.userName });
});

// Add connection into savedConnections page
router.get('/save', [
    check('userEvents').custom((value, {req}) => {
        if(req.session.userEvents === null || req.session.userEvents === undefined){
            throw new Error('Please register for the connection after you login')
        }else{
            return true;
        }
    })
],async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log('Inside Error Loop');
        return res.render('login', { loggedIn: (req.session.users) ? true : false, errors: errors.array() });
    }

    var id = parseInt(req.query.connectionId);
    var rsvp = req.query.rsvp;

    req.session.connectionId = id;
    req.session.rsvp = rsvp;
    if (req.session.userEvents == null || req.session.userEvents == undefined) {
        return res.redirect('/login');
    }
    var status = await userProfile.checkConnectionRegistered(id, req.session.userEvents);

    if (status) {
        return res.redirect('./update');

    } else {
        // console.log("userId::::"+req.session.userId);
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
var express =  require('express');
var router = express.Router();
var session = require('express-session');
var connectionObj = require('../utility/connectionDB');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

router.post('/*', urlEncodedParser, async(req, res) => {

    await connectionObj.addConnection(req.body);
    return res.redirect('/connections');
})

module.exports = router;
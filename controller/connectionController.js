var express =  require('express');
var router = express.Router();
var session = require('express-session');
var connectionObj = require('../utility/connectionDB');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

//get connections from connectionDB, if ID is there then redirect to connection page and if it is not there then redirect to connections page.
router.get('/*', function(req,res) {
    if (Object.keys(req.query).length === 0) {
        var ConcertConnections = connectionObj.getConcertConnections();
        var LiveConnections = connectionObj.getLiveConnections();
        res.render('connections', { ConcertConnections: ConcertConnections, LiveConnections: LiveConnections, loggedIn: (req.session.users) ? true : false  });
    }
    else if(req.query.connectionId) {
        if (req.query.connectionId) {
            var connection = connectionObj.getConnectionById(req.query.connectionId);
            res.render('connection', { connection : connection, loggedIn: (req.session.users) ? true : false  });
        }
        else {
            var ConcertConnections = connectionObj.getConcertConnections();
            var LiveConnections = connectionObj.getLiveConnections();
            res.render('connections', { ConcertConnections: ConcertConnections, LiveConnections: LiveConnections, loggedIn: (req.session.users) ? true : false  });
        }
    }
    else {
        var ConcertConnections = connectionObj.getConcertConnections();
        var LiveConnections = connectionObj.getLiveConnections();
        res.render('connections', { ConcertConnections: ConcertConnections, LiveConnections: LiveConnections, loggedIn: (req.session.users) ? true : false  });
    }    
});

module.exports = router;
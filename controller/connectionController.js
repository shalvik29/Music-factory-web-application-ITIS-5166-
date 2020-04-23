var express =  require('express');
var router = express.Router();
var session = require('express-session');
var connectionObj = require('../utility/connectionDB');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

//get connections from connectionDB, if ID is there then redirect to connection page and if it is not there then redirect to connections page.
router.get('/*', async function(req,res) {

    req.session.categories = await connectionObj.getAllCategories();
    req.session.connection = await connectionObj.getAll();
    if (Object.keys(req.query).length === 0) {
        res.render('connections', { connection : req.session.connection, categories:req.session.categories, loggedIn: (req.session.users) ? true : false  });
    }
    else if(req.query.connectionId) {
        if (req.query.connectionId) {
            var connection = await connectionObj.getConnectionById(req.query.connectionId);
            if(connection == null || connection == undefined) {
                res.render('connections', { connection : req.session.connection, categories:req.session.categories, loggedIn: (req.session.users) ? true : false  });
            }
            // console.log("shalvik"+JSON.stringify(connection));
            res.render('connection', { connection : connection, loggedIn: (req.session.users) ? true : false  });
        }
        else {
            res.render('connections', { connection : req.session.connection, categories:req.session.categories, loggedIn: (req.session.users) ? true : false  });
        }
    }
    else {
        res.render('connections', { connection : req.session.connection, categories:req.session.categories, loggedIn: (req.session.users) ? true : false  });
    }    
});

module.exports = router;
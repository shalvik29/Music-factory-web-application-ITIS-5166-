var express =  require('express');
var router = express.Router();
var session = require('express-session');
var connectionObj = require('../utility/connectionDB');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const { check, validationResult } = require('express-validator');

router.use(session({
    secret: 'eventSession',
    cookie: { secure: true }
}));

router.post('/*', urlEncodedParser, [
    check('Name').isString().isLength({min: 5}).withMessage('Connection name should be atleast 5 characters'),
    check('topic').isString().isLength({min: 5}).withMessage('Topic name should be atleast 5 characters'),
    check('location').isString().isLength({min: 5}).withMessage('Location name should be atleast 5 characters'),
    check('date').isString().isLength({min:5}).withMessage('Please mention the connection date'),
    check('time').isString().isLength({min: 2}).withMessage('Time must be in proper format.'),
    check('details').isString().isLength({min: 5}).withMessage('Please enter the details of connection minimum 5 characters'),
    check('userEvents').custom((value, {req}) => {
        if(req.session.userEvents === null || req.session.userEvents === undefined){
            throw new Error('Please add an Connection after you login');
        }else{
            return true;
        }
    })
], async(req, res) => {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        console.log('Errors in connection');
        return res.render('newConnection', { loggedIn: (req.session.users) ? true : false, errors: errors.array() });
    }
    console.log('Connection added successfully');
    await connectionObj.addConnection(req.body);
    return res.redirect('/connections');
})

module.exports = router;
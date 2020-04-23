var user = require('../models/user');

// Loading all hardcoded users when the user signs in
async function getUsers(){
     var allUsers = await user.Users.find({}, (err, data) => {
            console.log('All Users'+JSON.stringify(data));
            if(err)
                console.error(err);
            return data;
     })
     return allUsers;
 }

module.exports = {getUsers};


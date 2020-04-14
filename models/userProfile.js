
class userProfile {
    constructor(userId, userEvent){
        this.userId = userId;
        this.userEvent = userEvent;
    }

    getuserId() {
        return this.userId;
    }

    setuserId(userId) {
        this.userId = userId;
    }

    getuserEvent() {
      return this.userEvent;
    }
  
    setuserEvent(userEvent) {
      this.userEvent = userEvent;
    }

}

module.exports.userProfile = userProfile;
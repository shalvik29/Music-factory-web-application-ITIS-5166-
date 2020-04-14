class userConnection {
    constructor(connectionId, connectionName, category, rsvp){
        this.connectionId = connectionId;
        this.connectionName = connectionName;
        this.category = category;
        this.rsvp = rsvp;
    }

    getconnectionId() {
        return this.connectionId;
    }

    setconnectionId(connectionId) {
        this.connectionId = connectionId;
    }

    getconnectionName() {
      return this.connectionName;
    }
  
    setconnectionName(connectionName) {
      this.connectionName = connectionName;
    }

    getcategory() {
        return this.category;
    }

    setcategory(category) {
        this.category = category;
    }

    getrsvp() {
      return this.rsvp;
    }
  
    setrsvp(rsvp) {
      this.rsvp = rsvp;
    }
}

module.exports.userConnection = userConnection;
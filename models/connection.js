class connection {
    constructor(Id, Name, topic, details, date, time, location) {
      this.Id = Id;
      this.Name = Name;
      this.topic = topic;
      this.details = details;
      this.date = date;
      this.time = time;
      this.location = location;
    }
  
    getId() {
      return this.Id;
    }
  
    setId(Id) {
      this.Id = Id;
    }
  
    getName() {
      return this.Name;
    }
  
    setName(Name) {
      this.Name = Name;
    }
    gettopic() {
      return this.topic;
    }
  
    settopic(topic) {
      this.topic = topic;
    }
    getdetails() {
      return this.details;
    }
  
    setdetails(details) {
      this.details = details;
    }

    getdate() {
       return this.date;
    }
    
    setdate(date) {
      this.date = date;
    }
    
    gettime() {
        return this.time;
    }

    settime(time) {
        this.time = time;
    }

    getlocation() {
        return this.location;
    } 

    setlocation(location) {
        this.location = location;
    }
}

module.exports.connection = connection;
class user {
    constructor(userId, firstName, lastName, email) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    getuserId() {
        return this.userId;
    }

    setuserId(userId) {
        this.userId = userId;
    }

    getfirstName() {
      return this.firstName;
    }
  
    setName(firstName) {
      this.firstName = firstName;
    }

    getlastName() {
      return this.lastName;
    }
  
    setlastName(lastName) {
      this.lastName = lastName;
    }

    getemail() {
      return this.email;
    }
  
    setemail(email) {
      this.email = email;
    }
}

module.exports.user = user;
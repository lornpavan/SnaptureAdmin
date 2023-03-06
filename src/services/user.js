export class User {
    /*firstName: string
    lastName: string
    email: string
    username: string
    password: string
    serverIP: string
    port: string*/
 
    constructor(firstname, lastName, email, username,     
        password, serverIP, port) {
      this.firstName = firstname;
      this.lastName = lastName;
      this.email = email;
      this.username = username;
      this.password = password;
      this.serverIP = serverIP;
      this.port = port;
    }
  }
import {User} from "./user";


 export function sendMessage(user) {
    console.log(user.firstName);
    const data = "{'auth':'snapturemobile','cmd':'signup','firstname':"+"'"+user.firstName+"'"+",'lastname':"+"'"+user.lastName+"'"+",'email':"+"'"+user.email+"'"+",'username':"+"'"+user.username+"'"+",'hash':"+"'"+user.password+"'"+",'serverIP':"+"'"+user.serverIP+"'"+",'port':"+"'"+user.port+"'"+"}"
    const webSocket = new WebSocket('ws://69.203.84.198:3435/login');

    webSocket.onmessage = function(event) {
      console.log(event.data);
      const msg = JSON.parse(event.data);
      console.log(msg);
      //console.log(event.data["'status'"]);
    }

    webSocket.onopen = (event) => {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
      webSocket.send(data);
    }
   // webSocket.close();
  }

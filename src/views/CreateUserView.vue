<script setup lang="ts">
    import { User } from "../services/user";
    import { ref } from "vue";
    //import {sendMessage} from "../services/server.js";

    const firstname = ref('');
    const lastname = ref('');
    const email = ref('');
    const serverip = ref('');
    const port = ref('');
    const res = ref();

    async function submitData() {
        if (lastname.value.length >=10) {
            lastname.value = lastname.value.substring(0,9);
        }
        const user = new User(firstname.value,lastname.value,email.value.toLowerCase(),(firstname.value.substring(0,1)+lastname.value).toLowerCase(),"temppass",serverip.value,port.value);
        console.log(user.firstName);
        console.log(sendMessage(user));
    }

    function sendMessage(user: { firstName: string; lastName: string; email: string; username: string; password: string; serverIP: string; port: string; }) {
    console.log(user.firstName);
    const data = "{'auth':'snapturemobile','cmd':'signup','firstname':"+"'"+user.firstName+"'"+",'lastname':"+"'"+user.lastName+"'"+",'email':"+"'"+user.email+"'"+",'username':"+"'"+user.username+"'"+",'hash':"+"'"+user.password+"'"+",'serverIP':"+"'"+user.serverIP+"'"+",'port':"+"'"+user.port+"'"+"}"
    const webSocket = new WebSocket('ws://69.203.84.198:3435/login');

    webSocket.onmessage = function(event) {
      console.log(event.data);
      res.value = JSON.parse(event.data);
      webSocket.close();
      //console.log(msg);
      //console.log(event.data["'status'"]);
    }

    webSocket.onopen = (event) => {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
      webSocket.send(data);
    }
   // webSocket.close();
  }
</script>

<template>
    <div class="spacer"></div>
    <h3 class="title is-3 is-centered has-text-centered">Create New User</h3>
    <div class="columns is-centered has-text-centered">
        <div class="column is-centered is-2">            
            <div class="field">
                <label class="label">First Name</label>
                <div class="control">
                <input class="input" placeholder="First Name" v-model="firstname">
                </div>
            </div>
            <div class="field">
                <label class="label">Last Name</label>
                <div class="control">
                <input class="input" placeholder="Last Name" v-model="lastname">
                </div>
            </div>
            <div class="field">
                <label class="label">Email</label>
                <div class="control">
                <input class="input" placeholder="Email" v-model="email">
                </div>
            </div>
            <div class="field">
                <label class="label">Server IP</label>
                <div class="control">
                <input class="input" placeholder="Server IP" v-model="serverip">
                </div>
            </div>
            <div class="field">
                <label class="label">Port</label>
                <div class="control">
                <input class="input" placeholder="Port" v-model="port">
                </div>
            </div>
            <button class="button is-primary" @click="submitData()">Create User</button>
        </div>
    </div>
    <p class="has-text-centered">{{ res }}</p>
</template>

<style scoped>

.spacer {
  margin-top: 100px;
}

</style>



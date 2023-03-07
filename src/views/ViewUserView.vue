<script setup lang="ts">
import { ref } from "vue";
import { User } from "../services/user";

const res = ref();
const userList = ref([] as User[]);
const webSocket = new WebSocket('ws://69.203.84.198:3435/login');
const dialog = ref(false);

function showDialogue() {
  dialog.value = !dialog.value;
}

webSocket.onopen = (event) => {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
      getUsers();
}

const key = ref(0);
async function getUsers() {
    const data = "{'auth':'snapturemobile','cmd':'getusers'}";
    webSocket.send(data);
    webSocket.onmessage = function(event) {
      //console.log(event.data);
      res.value = JSON.parse(event.data);
      //console.log(result);
      let result = [] as User[];
      for(var i in res.value) {
        result.push(new User(res.value[i].firstname,res.value[i].lastname,res.value[i].email,res.value[i].username,"****",res.value[i].serverIP,res.value[i].port));
      }
      userList.value = result;

      /*NEW USER
      this.firstName = firstname;
      this.lastName = lastName;
      this.email = email;
      this.username = username;
      this.password = password;
      this.serverIP = serverIP;
      this.port = port;


      login USER
          firstname: {
        type: String,
        required: true
        },
        lastname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        username: {
            type: String
        },
        password: {
            type: String,
            required: true
        },
        serverIP: {
            type: String,
            required: true
        },
        port: {
            type: String,
            required: true
        },
      */

      //var results = JSON.parse(fs.readFileSync('Game.json', 'utf8'));
      //let tempArray = res.value
      //console.log(msg);
      //console.log(event.data["'status'"]);
    }
   // webSocket.close();
}

function deleteUser(user: User) {
  const data = "{'auth':'snapturemobile','cmd':'deleteuser','email':'" + user.email + "'}";
  webSocket.send(data);
  webSocket.onmessage = async function(event) {
    console.log(event.data);
    await getUsers();
    console.log(key);
    key.value++;
    console.log(key);
  }
}

/*


function sendMessage(user: { firstName: string; lastName: string; email: string; username: string; password: string; serverIP: string; port: string; }) {
    console.log(user.firstName);
    const data = "{'auth':'snapturemobile','cmd':'signup','firstname':"+"'"+user.firstName+"'"+",'lastname':"+"'"+user.lastName+"'"+",'email':"+"'"+user.email+"'"+",'username':"+"'"+user.username+"'"+",'hash':"+"'"+user.password+"'"+",'serverIP':"+"'"+user.serverIP+"'"+",'port':"+"'"+user.port+"'"+"}"
    const webSocket = new WebSocket('ws://69.203.84.198:3435/login');

    webSocket.onmessage = function(event) {
      console.log(event.data);
      res.value = JSON.parse(event.data);
      //console.log(msg);
      //console.log(event.data["'status'"]);
    }

    webSocket.onopen = (event) => {
      console.log(event)
      console.log("Successfully connected to the echo websocket server...")
      webSocket.send(data);
    }
   // webSocket.close();
  }*/
  
</script>

<template>
  <div class="spacer"></div>
  <div class="columns is-centered has-text-centered">
    <div class="column is-centered">
      <h3 class="title is-3">View All Users:</h3>
      <table class="table is-striped is-bordered is-centered has-text-centered mx-auto">
            <thead class="thead">
                <tr class="tr">
                    <th class="th">Name</th>
                    <th class="th">Email</th>
                    <th class="th">Username</th>
                    <th class="th">ServerIP</th>
                    <th class="th">Port</th>
                    <th class="th">Edit</th>
                    <th class="th">Delete</th>
                </tr>
            </thead>
            <tbody class="tbody" :key="key">
                <tr v-for="user in userList" class="tr">
                    <td class="td">{{user.firstName}} {{user.lastName}}</td>
                    <td class="td">{{user.email}}</td>
                    <td class="td">{{user.username}}</td>
                    <td class="td">{{user.serverIP}}</td>
                    <td class="td">{{user.port}}</td>
                    <td class="td">
                    <button class="button" @click="showDialogue()">
                      <v-icon>mdi-pencil</v-icon>
                    </button>
                    </td>
                    <td class="td">
                    <button class="button" @click="deleteUser(user)">
                      <v-icon>mdi-delete</v-icon>
                    </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="spacer"></div>
    </div>
  </div>
  <dialog :open="dialog" class="window">
    <p>Subject: <input type="text" value="subjectName" placeholder="Subject" />
    </p>
    <p>Task: <input type="text" value="taskName" placeholder="Task" />
    </p>
    <p>Due Date: <input type="date" value="dueDate" placeholder="Due Date" />
    </p>
    <form method="dialog">
      <button>Save</button>
    </form>
  </dialog>
</template>


<style scoped>

.spacer {
  margin-top: 100px;
}

</style>
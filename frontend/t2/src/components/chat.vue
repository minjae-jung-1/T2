<template>

    <div id="chatWrapper">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <div id="chat">
        <div v-for="(msg, index) in messages" :key="index">
            <div class="line" >
            <img src="../assets/pepe2.png" alt="Avatar">
            <div>{{msg.username}}:  {{msg.message}} </div>
            </div>
        </div>
    </div>
     <form @submit.prevent="sendMessage()" class="line">
        <input v-model="message" @keydown.enter="sendMessage()" type="text/submit" id="chatInput" value="test" >
        <button type="submit" @click="sendMessage()" id="send" class="btn btn-primary">Send</button>
        </form>

</div>
    
</template>




<script>
import io from 'socket.io-client';
export default {
  name: 'chatComp',
  data() {
      return {
          user: 'BRAN',
          message: '',
          messages: [],
          socket : io('http://localhost:3000', {secure: true})
      }
  },  
   methods: {
      sendMessage(){
        console.log(this.message.length)
        if(this.message.replace(/\s/g, '').length) {
          this.socket.emit('SEND_MESSAGE', {
              message: this.message,
              username: "branTest"
          });
          this.message = ''
        }
      },
      getPicture(msg) {
        return `https://graph.facebook.com/v6.0/${msg.userId}/picture?type=large`;
      }
  },
  mounted() {
      this.socket.on('MESSAGE', (data) => {
          let dm = {"username": data.data.username, "message": data.data.message};
          this.messages.push(dm)
      });
  }
}
</script>

<style> 
#chat { 
    overflow-y: auto;
    margin: 0 auto;
    height: 40vh;
    width: 60vw;
    word-wrap: break-word;
    border:lightslategrey;
    border-style: solid;
}
#chatInput {
    width: 90%
}
#send {
    float: right;
}
 /* Chat containers */
.line {
  border: 2px solid #dedede;
  border-radius: 5px;
  padding: 10px;
  margin: 10px 0;
}
/* Clear floats */
.line::after {
  content: "";
  clear: both;
  display: table;
}
/* Style images */
.line img {
  float: left;
  max-width: 60px;
  width: 100%;
  margin-right: 20px;
  border-radius: 50%;
}
/* Style the right image */
.line img.right {
  float: right;
  margin-left: 20px;
  margin-right:0;
}
/* Style time text */
.time-right {
  float: right;
  color: #aaa;
}
/* Style time text */
.time-left {
  float: left;
  color: #999;
} 
#chatWrapper {
    margin-top: 40vh;
}
</style>
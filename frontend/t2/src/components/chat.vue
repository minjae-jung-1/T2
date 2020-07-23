<template>

    <div id="chatWrapper">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <div id="chat">
        <div v-for="(msg, index) in messages" :key="index">
            <div class="line">
                <img :src="msg.userAvi" alt="Avatar"/>
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
//TODO Multer to download people's profile pictures on the backend and serve it up via a static folder.

export default {
  name: 'chatComp',
  data() {
      return {
          userDetails: JSON.parse(sessionStorage.getItem("userData")),
          user: 'BRAN',
          message: '',
          messages: []
      }
  },  
  sockets: {
    MESSAGE: function(data) {
      console.log("is this working?")
      let dm = {"username": data.data.username, "message": data.data.message, "userAvi": data.data.userAvi};
      this.messages.push(dm)
    }
  },
   methods: {
      sendMessage(){
        console.log(this.message.length)
        if(this.message.replace(/\s/g, '').length) {
          let newMessage = {
            "username": this.userDetails.username,
            "message": this.message,
            "userAvi": this.userDetails.avi
          }
          this.messages.push(newMessage)
          this.$socket.client.emit('SEND_MESSAGE', newMessage);
          this.message = ''
        }
      },
      getPicture(msg) {
        return `https://graph.facebook.com/v6.0/${msg.userId}/picture?type=large`;
      }
  },
  mounted() {
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
    width: 90%;
    padding-right: .5rem;
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
  width: 72%;
  margin: auto;
  margin-top: 1%;
}
/* .imgLandscape {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
}
.imgLandscape img {
  width: 100%;
  height: 100%;
  float: left;
  margin-right: 20px;
} */

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
  height: 60px;
  margin-right: 20px;
  border-radius: 50%;
  max-height: 60px;
  overflow: hidden;
  width: auto;
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
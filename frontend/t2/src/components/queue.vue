<template>
  <div>
    <div class="row">
      <div class="col-sm center-page text-center">
        <button @click="queueCsgo()" class="btn btn-secondary">CS <span v-if="queue && queue.csgo" class="badge badge-dark ml-2">{{ queue.csgo.playerCount }}</span></button>
        </div>
        <div class="col-sm center-page text-center">
        <button @click="queueLeague()" class="btn btn-secondary">league<span v-if="queue.league" class="badge badge-dark ml-2">{{ queue.league.playerCount }}</span></button>
        </div>
    </div>
</div>
</template>
<script>
import io from "socket.io-client";
export default {
    name: "queueComp",
    data() {
      return {
        socket: io("http://localhost:3000", {secure: true}),
        queue: {}
      }
    },
    methods: {
      queueLeague() {
        let user = JSON.parse(sessionStorage.getItem("userData"));
        this.socket.emit("queueLeague", {
          user
        })
      },
      queueCsgo() {
        let user = JSON.parse(sessionStorage.getItem("userData"));
        this.socket.emit("queueCsgo", {
          user
        })
      }
    },
    created() {
      console.log("is this happening?")
      this.socket.on("queueStatus", (data) => {
        console.log("connection thing", data);
        this.queue = data.queue;
      })
      this.socket.on("playerJoined", (data) => {
        this.queue = data.queue;
      })
    }
}
</script>

<style>

</style>
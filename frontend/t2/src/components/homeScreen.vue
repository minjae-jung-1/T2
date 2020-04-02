<template>
  <div class="container">
            <div class="row">
              <div class="col-sm center-page">
                <button>CS</button>
              </div>
              <div class="col-sm center-page">
                <button @click="queueLeague()">league</button>
              </div>
            </div>
          </div>
</template>

<script>
import io from "socket.io-client";

export default {
    name: "homeScreen",
    data() {
      return {
        socket: io("http://localhost:3000", {secure: true})
      }
    },
    methods: {
      queueLeague() {
        let user = JSON.parse(sessionStorage.getItem("userData"));
        this.socket.emit("queueLeague", {
          user
        })
      }
    }
}
</script>

<style>

</style>
<template>
  <div>
    <div class="row">
      <div class="col-sm center-page text-center">
        <button :disabled="csgoButton" @click="queueCsgo()" class="btn btn-secondary">CS <span v-if="queueData && queueData.csgo" class="badge badge-dark ml-2">{{ queueData.csgo.playerCount }}</span></button>
        </div>
        <div class="col-sm center-page text-center">
        <button :disabled="leagueButton" @click="queueLeague()" class="btn btn-secondary">league<span v-if="queueData.league" class="badge badge-dark ml-2">{{ queueData.league.playerCount }}</span></button>
        </div>
    </div>
    <div class="modal fade" id="MatchModal">
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-body">
              <button class=" btn-lg btn-success accept">Accept</button>
            </div>
         </div>
      </div>
    </div>
</div>
</template>
<script>

export default {
    name: "queueComp",
    data() {
      return {
        userDetails: JSON.parse(sessionStorage.getItem("userData")),
        leagueButton: false,
        csgoButton: false,
        matchFound: false,
        matchModal: undefined
      }
    },
    sockets: {
      connect: function() {
        console.log("socket connected :)")
      },
      queueStatus: function(data) {
        console.log("Should I just use this?", data)
      }
    },
    methods: {
      queueLeague() {
        let user = JSON.parse(sessionStorage.getItem("userData"));
        this.$socket.emit("queueLeague", {
          user
        })
      },
      queueCsgo() {
        let user = JSON.parse(sessionStorage.getItem("userData"));
        this.$socket.emit("queueCsgo", {
          user
        })
      },
      joinUsers() {
        this.$socket.emit("joinUsers", this.user)
      }
    },
    created() {

      console.log("is this happening?", this.$socket)
      // this.$socket.on("queueStatus", (data) => {
      //   console.log("connection thing", data);
      //   this.queue = data.queue;
      //   // if (this.queue.league.playerIds.includes(this.userDetails._id))
      //   //   this.leagueButton = true;

      //   // if (this.queue.csgo.playerIds.includes(this.userDetails._id))
      //   //   this.csgoButton = true;
      // })
      // this.$socket.on("playerJoined", (queue) => {
      //   console.log("Triggered theirs");
      //   this.queue = queue;
      //   // if (this.queue.league.playerIds.includes(this.userDetails._id))
      //   //   this.leagueButton = true;

      //   // if (this.queue.csgo.playerIds.includes(this.userDetails._id))
      //   //   this.csgoButton = true;
      // })
    },
    mounted() {
      this.matchModal = $("#MatchModal");
      console.log(typeof(this.matchModal))
      // this.$socket.on("csgoMatchFound", (lobby) => {
      //   console.log(lobby);

      //   this.matchModal.modal("show");
      //   // create a method to show the modal -- and stay open for another 10 seconds, maybe show who is readied up

      // })
    },
    computed: {
      queueData() {
        return this.$store.getters.getQueue;
      }
    }
}
</script>

<style>
.accept {
  position: absolute;
  left: 50%;
  top: 50%;
}
.matchFound {
  height: 30%;
}
</style>
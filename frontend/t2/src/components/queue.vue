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
          <div class="modal-header">
            <h4 class="modal-title">
              Match Found: {{ matchCounter }}
            </h4>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
            <div class="modal-body text-center">
              <button class="btn-lg btn-success accept" @click="">Accept</button>
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
        matchModal: undefined,
        matchCounter: 10
      }
    },
    sockets: {
      // might use this for Queue pop event
      csgoMatchFound: function(lobby) {
        console.log(lobby);

        this.matchModal.modal("show");
        // create a method to show the modal -- and stay open for another 10 seconds, maybe show who is readied up
        // start 10 second timer
        //countdown interval
        var matchTimer = setInterval(() => {
          if (this.matchCounter <= 1){
            clearInterval(matchTimer);
          }
          this.matchCounter--
        }, 1000);

        setTimeout(() => {
          this.matchModal.modal("hide");
        }, 10000)

        this.matchCounter = 10;
      },
      playerJoined: function(data) {
        console.log("does this trigger work?")
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
        this.$socket.emit("joinUsers", this.userDetails)
      }
    },
    created() {
      this.joinUsers()
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
      },
      inLeague() {
        return this.$store.getters.getQueuedLeague(this.userDetails._id);
      },
      inCsgo() {
        return this.$store.getters.getQueuedCsgo(this.userDetails._id);
      }
    }
}
</script>

<style>
.accept {
  margin: auto;
}
.matchFound {
  height: 30%;
}
</style>
<template>
  <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-6">
        <table class="table table-hover table-bordered">
            <thead>
            <th>
                <tr>Team 1</tr>
            </th>
            </thead>
            <tbody v-for="(player, index) in lobby.team1.players" :key="index">
                <tr>
                    <td class="bran"><img :src="player.avi"/>
                        {{player.username}}
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
        <div class="col-6">
        <table class="table table-hover table-bordered">
            <thead>
            <th>
                <tr>Team 2</tr>
            </th>
            </thead>
            <tbody v-for="(player, index) in lobby.team2.players" :key="index">
                <tr>
                    <td class="bran"><img :src="player.avi"/>
                        {{player.username}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "lobby",
  props: ["lobbyId"],
  data() {
      return {
          lobby: {
              team1: {
                  captain: "",
                  players: []
              },
              team2: {
                  captain: "",
                  players: []
              }
          }
      }
  },
  methods: {
      getGame() {
          axios.get(`https://localhost:3000/api/games/${this.lobbyId}`)
            .then(res => {
                if (res.status === 200){
                    this.lobby = res.data;
                }
            });
      }
  },
  mounted() {
      this.getGame();
  }
};
</script>


<style lang="scss" scoped>
.bran img {
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

</style>
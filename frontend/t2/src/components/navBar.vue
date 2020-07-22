<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/#/home">Tenmen</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--logout button? -->
  </div>
  <div class="nav-item dropdown ml-auto">
        <a class="nav-link dropdown-toggle text-dark"  id="navbarDropdown" role="button" data-toggle="dropdown">
          <i class="fa fa-user"/>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="goProfile()"><i class="fas fa-user"/> Profile Settings</a>
          <a class="dropdown-item" @click="goMatchHistory()"><i class="fas fa-history"/> Match History</a>
          <div class="dropdown-divider"></div>
          <a @click="signOut" class="dropdown-item"><i class="fas fa-sign-out-alt"/> Logout</a>
        </div>
      </div>
</nav>
</template>
<script>
// TODO add login logout button
// TODO add user profile button
import axios from "axios";
export default {
    name: "navbar",
    data() {
      return {
        
      }
    },
    methods: {
      goProfile() {
        let userDetails = JSON.parse(sessionStorage.getItem("userData"));
        this.$router.push({path: `/profile/${userDetails._id}`, params: {userId: userDetails._id}});
      },
      signOut() {
        sessionStorage.clear();
        axios.get("https://localhost:3000/api/signout")
         this.$router.push({path: "/"})
      },
      goMatchHistory(){
        this.$router.push({path: "match-history"})
      }

    }
}
</script>
<style scoped>
</style>
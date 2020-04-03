<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/#/home">Tenmen</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <!--logout button? -->
  </div>
  <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle text-white"  id="navbarDropdown" role="button" data-toggle="dropdown">
          <i class="fas fa-user"/>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" @click="goProfile()"><i class="fas fa-user"/> Profile Settings</a>
          <a class="dropdown-item" >My Timelines</a>
          <div class="dropdown-divider"></div>
          <a @click="signOut()" class="dropdown-item"><i class="fas fa-sign-out-alt"/> Logout</a>
        </div>
      </div>
</nav>
</template>
<script>
// TODO add login logout button
// TODO add user profile button
export default {
    name: "navbar",
    methods: {
      goProfile() {
        this.$router.push({path: "profile"});
      },
      signOut() {
         //asios.get("http://localhost:3000/api/users/signout")
         this.$router.push({path: "login"})
      }
    }
}
</script>
<style scoped>
</style>
<template>
  <div id="app">
    <navbar/>
      <router-view/>
  </div>
</template>
<script>
import navbar from "./components/navBar.vue"
export default {
  name: "app",
  components: {
    navbar
  }
}
</script>>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
  overflow-x: hidden;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

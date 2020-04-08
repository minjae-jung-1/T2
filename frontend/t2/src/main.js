import Vue from 'vue'
import App from './App.vue'
import router from './router'
import io from "socket.io-client";
import VueSocketio from "vue-socket.io";
import store from './store'

Vue.use(new VueSocketio({
  connection: io("https://localhost:3000", { secure: true }),
  vuex: {
    store,
    actionPrefix: "SOCKET_",
    mutationPrefix: "SOCKET_"
  }
}))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

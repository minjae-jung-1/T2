import Vue from 'vue'
import App from './App.vue'
import router from './router'
import io from "socket.io-client";
// import VueSocketio from "vue-socket.io";
import VueSocketIOExt from "vue-socket.io-extended"
import store from './store'

const socket = io("https://localhost:3000", { secure: true });

Vue.use(VueSocketIOExt, socket, { store });

// Vue.use(new VueSocketio({
//   connection: io("https://localhost:3000", { secure: true }),
//   vuex: {
//     store,
//     actionPrefix: "SOCKET_",
//     mutationPrefix: "SOCKET_"
//   }
// }))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')

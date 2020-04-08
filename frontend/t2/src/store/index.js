import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    queue: {}
  },
  mutations: {
    SOCKET_CONNECT(state) {
      state.connected = true;
    },
    SOCKET_DISCONNECT(state) {
      state.connected = false;
    },
    SOCKET_queueStatus(state, newQueue) {
      state.queue = newQueue;
    },
    SOCKET_playerJoined(state, newQueue){
      state.queue = newQueue;
    }
  },
  getters: {
    getQueue(state) {
      return state.queue
    }
  },
  actions: {
  },
  modules: {
  }
})

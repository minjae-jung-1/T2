import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    queue: {},
    queuedLeague: false,
    queuedCsgo: false
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
      console.log("triggered :)");
      state.queue = newQueue;
    }
  },
  getters: {
    getQueue(state) {
      return state.queue
    },
    getQueuedLeague(state) {
      return playerId => state.queue.league.playerIds.includes(playerId);
    },
    getQueuedCsgo(state) {
      return playerId => state.queue.csgo.playerIds.includes(playerId);
    }
  },
  actions: {
  },
  modules: {
  }
})

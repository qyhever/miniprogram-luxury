import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionid: '',
    userInfo: {}
  },
  getters: {
    sessionid: state => state.sessionid,
    userInfo: state => state.userInfo
  },
  mutations: {
    SET_SESSION_ID (state, data) {
      state.sessionid = data
    },
    SET_USERINFO (state, data) {
      state.userInfo = data
    }
  },
  actions: {

  }
})

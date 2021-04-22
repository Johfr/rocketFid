import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: [],
    userId: null
  },
  getters: {
    getUsers (state) {
      return state.users
    },
    getUserId (state) {
      return state.userId
    }
  },
  mutations: {
    mutateUsers (state, payload) {
      state.users.push(payload)
    },
    mutateUserId (state, payload) {
      state.userId = payload
    }
  },
  actions: {
    mutateUsers ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('mutateUsers', payload)
        resolve()
      })
    },
    mutateUserId ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('mutateUserId', payload)
        resolve()
      })
    }
  },
  modules: {
  }
})

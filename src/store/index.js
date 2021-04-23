import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    datas: null,
    users: [],
    userId: null
  },
  getters: {
    getDatas (state) {
      return state.datas
    },
    getUsers (state) {
      return state.users
    },
    getUserId (state) {
      return state.userId
    }
  },
  mutations: {
    mutateDatas (state, payload) {
      state.datas = payload
    },
    mutateUsers (state, payload) {
      state.users.push(payload)
    },
    mutateUserId (state, payload) {
      state.userId = payload
    }
  },
  actions: {
    mutateDatas ({ commit }, payload) {
      return new Promise((resolve) => {
        commit('mutateDatas', payload)
        resolve()
      })
    },
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

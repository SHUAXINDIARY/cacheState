import Vue from 'vue'
import Vuex from 'vuex'
import {
  cacheState
} from '../until/cacheState'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [cacheState({
    // watch: []
    watch: ['name', 'user.name', 'other.msg']
    // watch: ['name']
  })],
  state: {
    name: "This is an about page",
    other: {
      msg: "root  state"
    }
  },
  mutations: {
    updateMsg(state, payload) {
      state.other.msg = payload.msg
    },
    update(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    }
  },
  modules: {
    user: {
      state: () => ({
        name: "shuaxin"
      }),
      mutations: {
        updateUserName(state, payload) {
          Object.keys(payload).forEach(key => {
            state[key] = payload[key]
          })
        }
      }
    }
  }
})
import Vue from 'vue'
import App from './App.vue'
import store from './store'

import cache from './until/installCacheState'
Vue.use(cache)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
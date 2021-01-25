import {
  removeCache,
  cacheState
} from './cacheState'
export default {
  cacheState,
  install (Vue) {
    Vue.mixin({
      created () {
        this.$removeCache = removeCache
      }
    })
  },
}
import {
    removeCache
} from './cacheState'
export default {
    install(Vue) {
        Vue.mixin({
            created() {
                this.$removeCache = removeCache
            }
        })
    }
}
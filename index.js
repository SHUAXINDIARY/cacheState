import {
    removeCache,
    cacheData,
    initState
} from './cacheState'
export default {
    install(Vue) {
        Vue.mixin({
            created() {
                this.$removeCache = removeCache
            }
        })
    },
    cacheState({
        watch
    }) {
        return function (store) {
            if (!Array.isArray(watch)) {
                console.error('watch 必须是一个数组')
            } else {
                // 读取缓存
                store.replaceState({
                    // 原来的数据
                    ...store.state,
                    // 读取缓存的数据
                    ...initState(store, watch)
                })
                // 监听state变化 缓存数据
                store.subscribe((mutation, state) => {
                    cacheData(watch, state)
                })
            }

        }
    }
}
// 获取嵌套对象的值
const deepRead = (obj, keysArr) => {
    console.log(keysArr, obj)
    let val = obj;
    keysArr.forEach(key => {
        val = val[key]
    })
    return val
}
// 读取嵌套对象的值
const deepSet = (state, keysArr, val) => {
    let obj = state
    keysArr.slice(0, keysArr.length - 1).forEach(key => {
        obj = obj[key]
    })
    obj[keysArr[keysArr.length - 1]] = val ? val : obj[keysArr[keysArr.length - 1]]
}
// 每次刷新更新state
const initState = (store, watch) => {
    const obj = {}
    watch.forEach(key => {
        let val
        if (key.indexOf('.') > -1) {
            deepSet(store.state, key.split('.'), localStorage.getItem(`deep_${key}`))
        } else {
            try {
                val = JSON.parse(localStorage.getItem(key))
            } catch (error) {
                val = localStorage.getItem(key)
            }
            obj[key] = val !== null ? val : store.state[key]
        }
    })
    return obj
}
const cacheData = (watch, state) => {
    watch.forEach(key => {
        if (key.indexOf('.') > -1) {
            localStorage.setItem(`deep_${key}`, deepRead(state, key.split('.')))
        } else {
            if (typeof state[key] === 'object') {
                localStorage.setItem(key, JSON.stringify(state[key]))
            } else {
                localStorage.setItem(key, state[key])

            }
        }
    })
}
// 缓存主函数
export function cacheState({
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
// 清除缓存
export function removeCache(callback, arr = []) {
    if (arr.length == 0) {
        localStorage.clear()
        callback !== undefined ? callback() : ''
    } else {
        arr.forEach(item => {
            let key = item.indexOf('.') === -1 ? item : `deep_${item}`
            localStorage.removeItem(key)
            callback !== undefined ? callback() : ''
        })
    }
}
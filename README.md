# cacheState
- vuex持久化的插件，自用，不能保证线上质量
- 用于开发环境调试时，避免刷新后vuex数据清空，方便开发的插件

# 文件说明
**src**
- cacheState：核心逻辑
- installCacheState：vue全局注入api文件

**example**
- 使用案例（vue-cli4.x初始化的项目）


# API
**removeCache(callback:Function?,target:Arrary?)**
> - callback：删除缓存后执行的回调
> - target：指定删除那些缓存，不指定时，默认删除全部

# 使用
- 安装该插件 
```shell
npm i cacheState -D
```
- 在store/index.js中
```js
// 引入插件
import {
  cacheState
} from '../until/cacheState'
export default new Vuex.Store({
    // 使用插件 只有一个参数 watch 数组类型
    // 传递的参数为要缓存的state的key
    // 当key为一个对象时，传递该key缓存整个对象
    // 要缓存对象的某一个key是 传递user.name
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
  mutations:{...}
```
- 删除缓存
```js
// 在所有组件中都可以使用
this.$removeCache()
```

# 原理
- 利用浏览器本地缓存localstrong实现数据缓存
- 通过vuex提供的plugins的特性，在每次实例化时检查缓存，更新state
- 通过vuex的store.subscribe()监听state变化，每次变化后进行数据缓存
- 通过利用闭包函数，提供配置选项

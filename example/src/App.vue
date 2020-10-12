<template>
  <div id="app">
    <div class="about">
      <h1 @click="updateName">{{ $store.state.name }}</h1>
      <h2 @click="updateUserName">{{ $store.state.user.name }}</h2>
      <h1 @click="updateMsg">{{ $store.state.other.msg }}</h1>
      <button @click="clear">clear</button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    clear() {
      this.$removeCache(() => {
        alert("删除成功");
      }, ["name"]);
    },
    updateMsg() {
      this.$store.commit("updateMsg", {
        msg: "根 state",
      });
    },
    updateName() {
      this.$store.commit("update", {
        name: "这是关于页面",
      });
    },
    updateUserName() {
      this.$store.commit("updateUserName", {
        name: "刷新",
      });
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

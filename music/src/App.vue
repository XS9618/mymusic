<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
    import './assets/reset.css';
    import './assets/iconfont/iconfont.css'
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* position: fixed;
  top: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; */
}
</style>

<template>
  <div id="app">
    <navigation></navigation>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "./Navigation";

export default {
  name: "App",
  components: { Navigation },
  created() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function(resolve, reject) {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch(logout);
        }
        throw err;
      });
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
.container {
  margin-top: 50px;
}
</style>

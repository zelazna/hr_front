import Vue from "vue";
import "./plugins/vuetify";
import App from "./components/App.vue";
import router from "./router";
import "es6-promise/auto";
import store from "./store";
import httpClient from "./httpClient";

Vue.prototype.$http = httpClient.client;

const token = localStorage.getItem("token");
if (token) {
  httpClient.setHeaders(token);
}
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");

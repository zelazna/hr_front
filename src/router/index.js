import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Job from "../components/Job";
import store from "../store";

Vue.use(VueRouter);

function requireAuth(to, _from, next) {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
}

const routes = [
  { path: "/", component: Home, beforeEnter: requireAuth },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  {
    path: "/logout",
    beforeEnter(_to, _from, next) {
      store.commit("logout");
      next("/");
    }
  },
  {
    path: "/job",
    component: Job,
    beforeEnter: requireAuth
  }
];
export default new VueRouter({ mode: "history", routes });

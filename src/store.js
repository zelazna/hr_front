import Vuex from "vuex";
import Vue from "vue";
import httpClient from "./httpClient";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    user: null,
    job: null,
    jobs: [],
    matchedJobs: [],
    status: null
  },
  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, token, user) {
      state.status = "success";
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
    },
    currentJob(state, job) {
      state.job = job;
    },
    unmatchedJobs(state, jobs) {
      state.jobs = jobs;
    },
    matchedJobs(state, jobs) {
      state.matchedJobs = jobs;
    }
  },
  getters: {
    isAuthenticated: state => !!state.token,
    jobs: state => state.jobs,
    status: state => state.status
  },
  actions: {
    login({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        httpClient
          .login(user)
          .then(resp => {
            const token = resp.data.auth_token;
            localStorage.setItem("token", token);
            httpClient.setHeaders(token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error");
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    register({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        httpClient
          .register(user)
          .then(resp => {
            const token = resp.data.auth_token;
            localStorage.setItem("token", token);
            httpClient.setHeaders(token);
            commit("auth_success", token, user);
            resolve(resp);
          })
          .catch(err => {
            commit("auth_error", err);
            localStorage.removeItem("token");
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve, _reject) => {
        commit("logout");
        localStorage.removeItem("token");
        httpClient.resetHeaders();
        resolve();
      });
    },
    getUnmatchedJobs({ commit }) {
      httpClient
        .getUnmatchedJobs()
        .then(res => {
          commit("unmatchedJobs", res.data);
        })
        .catch(e => e);
    },
    getMatchedJobs({ commit }, interest) {
      httpClient
        .getMatchedJobs(interest)
        .then(res => {
          commit("unmatchedJobs", res.data);
        })
        .catch(e => e);
    },
    matchJob({ commit }, interest) {}
  }
});

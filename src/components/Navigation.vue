<template>
  <span>
    <v-navigation-drawer
      app
      v-model="drawer"
      class="red lighten-2"
      dark
      disable-resize-watcher
      temporary
      absolute
    >
      <v-list>
        <template v-for="(item, index) in items">
          <v-list-tile :key="index">
            <router-link v-if="item.path" v-bind:to="item.path">
              <v-list-tile-content>{{item.title}}</v-list-tile-content>
            </router-link>
            <v-list-tile-content v-else>{{item.title}}</v-list-tile-content>
          </v-list-tile>
          <v-divider :key="`divider-${index}`"></v-divider>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app color="red darken-4" dark>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/">
        <v-toolbar-title data-cy="titleBtn">{{appTitle}}</v-toolbar-title>
      </router-link>
      <v-spacer class="hidden-sm-and-down"></v-spacer>
      <div v-if="!isAuthenticated" class="hidden-sm-and-down">
        <v-btn flat to="/login" data-cy="signinBtn">LOGIN</v-btn>
        <v-btn color="red lighten-3" to="/register" class="nav-join" data-cy="joinBtn">REGISTER</v-btn>
      </div>
      <div v-else>
        <!-- <v-btn flat to="/about">PROFILE</v-btn> -->
        <v-btn outline color="white" @click="logout" data-cy="logout">Logout</v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "Navigation",
  data() {
    return {
      appTitle: "Hr Jobs",
      drawer: false,
      items: [
        { title: "Menu" },
        { title: "Seek a job", path: "/" },
        { title: "Rejected Jobs" },
        { title: "Matched Jobs" }
      ]
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>
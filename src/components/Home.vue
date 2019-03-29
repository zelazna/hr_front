<template>
  <div>
    <v-layout row>
      <v-flex sm6 offset-sm3>
        <v-card>
          <v-list two-line>
            <template v-for="(job, index) in jobs">
              <v-list-tile :key="job.url" @click="goToDetail(job)">
                <v-list-tile-content>
                  <v-list-tile-title v-html="`${job.text.substr(0, 35)}...`"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="job.date"></v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-divider :key="index"></v-divider>
            </template>
          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  created() {
    // @TODO improve caching
    this.$store.dispatch("getUnmatchedJobs");
  },
  name: "Home",
  data() {
    return {};
  },
  computed: {
    jobs() {
      return this.$store.getters.jobs;
    }
  },
  methods: {
    goToDetail(job) {
      this.$store.commit("currentJob", job);
      this.$router.push("/job");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title {
  margin: 6% 0 6%;
}
</style>

<template>
  <div>
    <v-btn icon @click="goBack">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <h1>Job details</h1>
    {{ job.text }}
    <br>
    <a :href="`mailto:${job.email}`">{{job.email}}</a>
  </div>
</template>

<script>
export default {
  data() {
    return { job: this.$store.state.job };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>
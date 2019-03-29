<template>
  <v-app>
    <div class="container">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Register</h3>
              </div>
            </v-card-title>
            <v-card-text>
              <div>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                  <v-text-field
                    v-model="password"
                    :append-icon="show ? 'visibility' : 'visibility_off'"
                    :rules="passwordRules"
                    :type="show ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    @click:append="show = !show"
                  ></v-text-field>
                  <v-btn :disabled="!valid" color="success" @click="register">Submit</v-btn>
                </v-form>
              </div>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    show: false,
    valid: true,
    password: "",
    passwordRules: [v => !!v || "Password is required"],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    checkbox: false
  }),

  methods: {
    register() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("register", {
            email: this.email,
            password: this.password
          })
          .then(() => this.$router.push("/"))
          .catch(err => console.log(err));
      }
    }
  }
};
</script>
<style scoped>
</style>

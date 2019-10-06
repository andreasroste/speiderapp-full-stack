<template>
  <v-container>
    <h2>Velkommen!</h2>

    <v-alert type="warning" :value="devmode">Utviklermodus!</v-alert>

    <p>Logg inn med brukernavnet og passordet du har på Min speiding.</p>
    <v-form>
      <v-text-field v-model="username" label="Brukernavn"></v-text-field>
      <v-text-field
        v-model="password"
        type="password"
        label="Passord"
      ></v-text-field>
      <v-btn
        color="primary"
        block
        @click="login_btn_press"
        :loading="login_btn_loading"
        :disabled="login_btn_loading"
        >Logg inn</v-btn
      >
    </v-form>
    <img src="@/assets/logo.png" alt="" />
  </v-container>
</template>

<style scoped>
h2 {
  width: 100%;
  margin: 0 auto;
}
img {
  max-width: 60vw;
  margin: 0 auto;
  display: block;
  margin-top: 50px;
}
</style>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      login_btn_loading: false,
      devmode: process.env.NODE_ENV != "production"
    };
  },
  methods: {
    login_btn_press() {
      this.login_btn_loading = true; // Gjør knappen utrykkelig.

      // Prøver å logge inn
      this.$http
        .post("/api/login", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          // Det gikk fint.
          console.log(res.data);
          this.$store.state.user.data = res.data.member;
          this.$store.state.user.roles = res.data.roles;
          this.$store.state.authenticated = true;
          this.$store.dispatch("populateNavDrawer");

          this.$router.push("/");
        })
        .catch(err => {
          // Noe gikk galt.
          console.error(err);
        });
    }
  }
};
</script>
<template>
  <v-container>
    <h1>På gjensyn! :)</h1>
  </v-container>
</template>

<script>
export default {
  mounted() {
    const vm = this;
    vm.$http.post("/api/logout").then(() => {
      console.log("logged out");
      vm.$store.dispatch("logout");
    });
    setTimeout(() => {
      vm.$router.push("/login");
    }, 2000);
  }
};
</script>

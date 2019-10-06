<template>
  <v-container>
    <h1>På gjensyn! :)</h1>
  </v-container>
</template>

<script>
export default {
  mounted() {
    const vm = this;
    window.sessionStorage.clear();
    vm.$store.dispatch("logout");
    vm.$http.post("/api/logout");
    setTimeout(() => {
      vm.$router.push("/login");
    }, 2000);
  }
};
</script>

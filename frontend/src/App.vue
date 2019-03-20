<template>
  <v-app>
  <Navbar v-if="isLoggedIn"></Navbar>
  <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
  <Footer></Footer>
</v-app>
</template>

<script>

import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style>
  @font-face{
    src: url(assets/fonts/dinot.otf);
    font-family: 'DINOT';
  }
  * {
    font-family: 'DINOT';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
  }
</style>

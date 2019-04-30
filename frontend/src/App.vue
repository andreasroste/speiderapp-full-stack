<template>
  <v-app>
    <div id="app">
      <router-view id="approuter"></router-view>
      <Dockbar v-if="this.$store.getters.isLoggedIn"></Dockbar>
    </div>
    <!--<Navbar v-if="isLoggedIn"></Navbar>-->
  </v-app>
</template>

<script>

// import Navbar from './components/Navbar.vue'
import Dockbar from './components/Dockbar.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    // Navbar,
    Dockbar
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
  html {
    overflow-y: hidden;
  }
  * {
    box-sizing: border-box;
    font-family: 'DINOT';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-user-select: none;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    transition: .3s ease-in-out;
  }

  h1 {
    text-transform: uppercase;
    letter-spacing: 2px;
    text-align: center;
  }

  .s-btn {
		display: block;
		border-radius: 30px;
		padding: 10px 30px;
		border: none;
		background: rgba(255, 255, 255, 0.6);
		margin: 10px auto;
    text-align: center;
    color: black;
    text-decoration: none;
	}

  #app {
    background: linear-gradient(rgba(89, 101, 120, 0.1), rgba(89, 101, 120, 0.1)), url(./assets/logos/700x700-hvit.png);
    background-repeat: no-repeat;
    height: 100vh;
    display: flex;
    flex-direction: column;
  }

  #approuter {
    flex: 1;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    padding-top: 26px;
    height: 100%;
  }


  .bg-smaspeider { background: #f2cc07; }
  .bg-stifinner { background: #4d647c; }
  .bg-vandrer { background: #63ac3b; }
  .bg-rover { background: #751052; }
  .bg-leder { background: #2baccc; }

  @media screen and (max-width: 780px) {
    
  }


</style>

import Vue from "vue";
import Axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

// AXIOS
Axios.defaults.withCredentials = true;
Vue.prototype.$http = Axios; // Makes axios accessible globally

// ROUTER SETTINGS
//
router.beforeEach((to, from, next) => {
  if (to.name != "login" && !store.state.authenticated) {
    next("/login");
  } else if (to.name == "login" && !store.state.authenticated) {
    next();
  }
  if (store.state.authenticated) {
    next();
  }
});

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

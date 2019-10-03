import Vue from 'vue'
import './plugins/vuetify'
import Axios from 'axios'
// TODO: Slett import vueScrollPosition from 'vue-scroll-behavior';

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './registerServiceWorker'
import store from './store'

Vue.config.productionTip = false

Axios.defaults.withCredentials = true
Vue.prototype.$http = Axios // Makes axios accessible globally


router.beforeEach((to, from, next) => {
  if (to.name != 'login' && !store.getters.isLoggedIn) {
    next('/login')
  } else if (to.name == 'login' && !store.getters.isLoggedIn) {
    next()
  } if (store.getters.isLoggedIn) {
    next();
  }
})



new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
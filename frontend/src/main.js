import Vue from 'vue'
import './plugins/vuetify'
import Notifications from 'vue-notification';
import Axios from 'axios'
import vueScrollPosition from 'vue-scroll-behavior';

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './registerServiceWorker'
import store from './store'

Vue.config.productionTip = false

Vue.use(Notifications); // Enable notifications
Vue.prototype.$http = Axios

Vue.use(vueScrollPosition, {
  router
})

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
import Vue from 'vue'
import './plugins/vuetify'
import Notifications from 'vue-notification';
import Axios from 'axios'

import App from './App.vue'
import router from './router'
import i18n from './i18n'
import './registerServiceWorker'
import store from './store'

Vue.config.productionTip = false

Vue.use(Notifications); // Enable notifications
Vue.prototype.$http = Axios


const token = localStorage.getItem('token') // Getting token from localStorage
Vue.prototype.$http = Axios // Makes axios accessible globally
if(token) Vue.prototype.$http.defaults.headers.common['Authorization'] = token // If token is set, use the token in the Authorization header for all requests to server.


router.beforeEach((to, from, next) => {
  if(!store.getters.isLoggedIn){
    if(to.name == 'login'){
      next()
    }else{
      next('/login')
    }
  }else{
    next()
  }
})



new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
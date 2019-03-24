import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    primary: '#596578',
    secondary: '#66a457',
    accent: '#80476a',
    error: '#9e5458',
    success: '#66a457'
  }
})

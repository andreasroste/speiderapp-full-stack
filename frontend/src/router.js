import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
      meta: {
        name: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue'),
      meta: {
        name: 'login',
        navbar: false
      }
    },
    {
      path: '/group',
      name: 'group',
      component: () => import('./views/Group.vue'),
      meta: {
        name: 'group'
      }
    },
    {
      path: '/events',
      name: 'events',
      component: () => import('./views/Events.vue'),
      meta: {
        name: 'events',
        roleids: ['20']
      }
    },
    {
      path:'/logout',
      name: 'logout',
      component: () => import('./views/Logout.vue'),
      meta: {
        name: 'logout'
      }
    },
    {
      path: '*',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})

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
      path: '/events/create',
      name: 'create_event',
      component: () => import('./views/Events_add.vue'),
      meta: {
        name: 'create_event',
        navbar: false
      }
    },
    {
      path: '/events/view',
      name:'view_event',
      component: () => import('./views/Event_info.vue'),
      meta: {
        name: 'view_event',
        navbar: false
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
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 10 }
    }
  },
})

import Vue from 'vue'
import Router from 'vue-router'

import Events from './views/Events.vue'
import Profile from './views/Profile.vue'
import Login from './views/Login.vue'
import Group from './views/Group.vue'
import CreateEvent from './views/Events_add.vue'
import SingleEvent from './views/Event_info.vue'
import Calendar from './views/Calendar.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/profile',
      name: 'home',
      component: Profile,
      meta: {
        name: 'home'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        name: 'login',
        navbar: false
      }
    },
    {
      path: '/',
      name: 'group',
      component: Group,
      meta: {
        name: 'group'
      }
    },
    {
      path: '/events',
      name: 'events',
      component: Events,
      meta: {
        name: 'events'
      }
    },
    {
      path: '/events/create',
      name: 'create_event',
      component: CreateEvent,
      meta: {
        name: 'create_event',
        navbar: false
      }
    },
    {
      path: '/events/:id',
      name: 'view_event',
      component: SingleEvent,
      meta: {
        name: 'view_event',
        navbar: false
      }
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: Calendar,
      meta: {
        name: 'calendar',
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
      return { x: 0, y: 0 }
    }
  },
})

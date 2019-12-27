import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Logout from "./views/Logout.vue";
import Events from "./views/Events.vue";
import EventsInfo from "./views/Event_info.vue";
import Group from "./views/Group.vue";
import Memory from "./views/Memory.vue";
import Blogg from "./views/Blogg.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/events",
      name: "events",
      component: Events
    },
    {
      path: "/events/:id",
      name: "events_info",
      component: EventsInfo
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/group",
      name: "group",
      component: Group
    },
    {
      path: "/memory",
      name: "memory",
      component: Memory
    },
    {
      path: '/om',
      name: 'om',
      component: Blogg
    }
  ]
});

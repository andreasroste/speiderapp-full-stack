import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Profile from "./views/Profile.vue";
import Logout from "./views/Logout.vue";
import Events from "./views/Events.vue";

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
      path: "/logout",
      name: "logout",
      component: Logout
    }
  ]
});

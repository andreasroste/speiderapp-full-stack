import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

const persist = new VuexPersist({
  storage: window.sessionStorage
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      data: {},
      roles: {}
    },
    authenticated: false,
    drawer_items: []
  },
  mutations: {
    populateNavDrawer(state) {
      let user_unique_roles = [];
      let elements = [];

      state.user.roles.forEach(role => {
        // Gå gjennom alle rollene, og filtrer slik at vi bare har én av hver rolle. F.eks. at vi ikke får 'Enhetsleder' to ganger.
        let data = {
          level: role.level,
          key: role.role_key
        };
        if (!user_unique_roles.includes(data)) user_unique_roles.push(data);
      });

      // Elementer som skal inn i sidemenyen når innlogget, uavhengig av roller.
      elements.push({
        title: "Gruppe",
        link: "/group",
        iconlink: "gruppe.png"
      });
      elements.push({
        title: "Arrangementer",
        link: "/events",
        iconlink: "arrangementer.png"
      });
      elements.push({
        title: "Profil",
        link: "/profile",
        iconlink: "profil.png"
      });
      elements.push({
        title: "Spill",
        link: "/memory",
        icon: "mdi-gamepad"
      });

      user_unique_roles.forEach(role => {
        let jsonrole = JSON.stringify(role);

        // Legg til element hvis brukeren har en viss rolle på et visst nivå.
        if (
          jsonrole ==
          JSON.stringify({ level: "group", key: "assistant_leaderfinnesikke" })
        ) {
          elements.push({
            title: "Admin gruppe",
            link: "/group/admin",
            iconlink: "profil.png"
          });
        }
      });

      elements.push({
        title: "Logg ut",
        link: "/logout",
        icon: "mdi-lock"
      });

      state.drawer_items = elements;
    },
    clear_store(state) {
      state.user = { data: {}, roles: {} };
      state.authenticated = false;
      state.drawer_items = [];
    }
  },
  getters: {
    user_full_name(state) {
      if (
        typeof state.user.data.first_name != "undefined" &&
        typeof state.user.data.last_name != "undefined"
      ) {
        return state.user.data.first_name + " " + state.user.data.last_name;
      } else {
        return "";
      }
    },
    contact_info(state) {
      let info = [];
      for (var key in state.user.data.contact_info) {
        info.push(state.user.data.contact_info[key]);
      }
      return info;
    }
  },
  actions: {
    populateNavDrawer(context) {
      context.commit("populateNavDrawer");
    },
    logout(context) {
      context.commit("clear_store");
    }
  },
  plugins: [persist.plugin]
});

<template>
  <v-app>
    <!-- App bar -->
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawer_state = !drawer_state"
        v-if="user_full_name != ''"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Speiderapp</v-toolbar-title>
    </v-app-bar>

    <!-- Sidemeny -->
    <v-navigation-drawer v-model="drawer_state" fixed floating app temporary>
      <v-list-item v-if="user_full_name != ''">
        <v-list-item-avatar>
          <v-img src="/api/profileimage"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ user_full_name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.link"
        >
          <v-list-item-icon>
            <div v-if="typeof item.iconlink != 'undefined'">
              <v-img
                width="24px"
                height="24px"
                :src="require('./assets/icons/' + item.iconlink)"
              ></v-img>
            </div>
            <v-icon v-if="typeof item.icon != 'undefined'">{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Router -->
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<style scoped>
@font-face {
  font-family: "DINOT";
  src: url("assets/fonts/dinot.otf");
}
* {
  font-family: "DINOT";
}
</style>

<script>
export default {
  data() {
    return {
      drawer_state: false
    };
  },
  computed: {
    items() {
      return this.$store.state.drawer_items;
    },
    user_full_name() {
      return this.$store.getters.user_full_name;
    }
  }
};
</script>

<template>
  <v-app>
    <!-- App bar -->
    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon
        @click.stop="drawer_state = !drawer_state"
      ></v-app-bar-nav-icon>
      <v-toolbar-title>Speiderapp</v-toolbar-title>
    </v-app-bar>

    <!-- Sidemeny -->
    <v-navigation-drawer v-model="drawer_state" absolute app temporary>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Andreas Røste</v-list-item-title>
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
            <v-img
              width="24px"
              height="24px"
              :src="require('./assets/icons/' + item.iconlink)"
              v-if="item.iconlink != ''"
            ></v-img>
            <v-icon v-if="item.icon != ''">{{ item.icon }}</v-icon>
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
  src: url("/assets/fonts/dinot.otf");
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

import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
  theme: {
    themes: {
      dark: {
        primary: "#4d647c",
        secondary: "#751052",
        accent: "#2baccc",
        error: "#97282e",
        success: "#63ac3b"
      },
      light: {
        primary: "#4d647c",
        secondary: "#751052",
        accent: "#2baccc",
        error: "#97282e",
        success: "#63ac3b"
      }
    }
  }
});

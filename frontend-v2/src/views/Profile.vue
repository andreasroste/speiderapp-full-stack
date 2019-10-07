<template>
  <v-container>
    <h1>Profil</h1>
    <span class="text-right">
      Fotosamtykke:
      <v-icon v-if="photo_consent" color="green">mdi-check</v-icon>
      <v-icon v-if="!photo_consent" color="red">mdi-close</v-icon>
    </span>
    <v-card>
      <v-card-text>
        <v-expansion-panels v-model="contact_info_panel">
          <v-expansion-panel>
            <v-expansion-panel-header>Kontaktinformasjon</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn text block color="secondary" small :href="'https://min.speiding.no/organisation/user/edit_profile/' + user_member_no">Endre kontaktinfo på Min speiding</v-btn>
              <v-list>
                <div v-for="info in contactinfo" :key="info.id">
                  <v-subheader>{{ info.label }}</v-subheader>
                  <v-list-item v-if="info.field_type != 64">{{ info.value }}</v-list-item>
                  <v-list-item v-if="info.field_type == 64">
                    <v-icon v-if="info.value == 1" color="green">mdi-check</v-icon>
                    <v-icon v-if="info.value != 1" color="red">mdi-close</v-icon>
                  </v-list-item>
                </div>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-list>
          <v-subheader>Medlemsnummer</v-subheader>
          <v-list-item>{{ user_member_no }}</v-list-item>
          <v-subheader>Navn</v-subheader>
          <v-list-item>{{ user_full_name }}</v-list-item>
          <v-subheader>Fødselsdato</v-subheader>
          <v-list-item>{{ user_dob }}</v-list-item>
          <v-subheader>E-post</v-subheader>
          <v-list-item>{{ user_email }}</v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      contact_info_panel: [],
      photo_consent: false
    };
  },
  computed: {
    user_full_name() {
      return this.$store.getters.user_full_name;
    },
    user_email() {
      return this.$store.state.user.data.email;
    },
    user_member_no() {
      return this.$store.state.user.data.member_no;
    },
    user_dob() {
      return this.$store.state.user.data.dob;
    },
    contactinfo() {
      return this.$store.getters.contact_info;
    }
  },
  mounted() {
    const photo_consent = this.contactinfo.find(el => {
      if (el.field_type == 64) return true;
      else return false;
    });
    if (photo_consent.value == 1){
      this.photo_consent = true;
    }
  }
};
</script>

<template>
  <v-container>
    <h1>Profil</h1>
    <span class="text-right">
    </span>
    <v-card>
      <v-card-text>
        <!-- <v-expansion-panels v-model="contact_info_panel">
          <v-expansion-panel>
            <v-expansion-panel-header>Kontaktinformasjon</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-btn text block color="secondary" small :href="'https://min.speiding.no/organisation/user/edit_profile/' + user_member_no">Endre kontaktinfo på Min speiding</v-btn>
              <v-simple-table>
                <thead>
                  <tr>
                    <th>Felt</th>
                    <th>Verdi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="info in contactinfo" :key="info.id">
                    <td>{{ info.label }}</td>
                    <td v-if="info.field_type != 64">{{ info.value }}</td>
                    <td v-if="info.field_type == 64">
                      <v-icon v-if="info.value == 1" color="green">mdi-check</v-icon>
                      <v-icon v-if="info.value != 1" color="red">mdi-close</v-icon>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels> -->
        <v-simple-table>
          <tbody>
            <tr>
              <td>Navn</td>
              <td>{{ user_full_name }}</td>
            </tr>
            <tr>
              <td>Medlemsnummer</td>
              <td>{{ user_member_no }}</td>
            </tr>
            <tr>
              <td>Fødselsdato</td>
              <td>{{ user_dob }}</td>
            </tr>
            <tr>
              <td>E-post</td>
              <td>{{ user_email }}</td>
            </tr>
            <tr v-for="info in contactinfo" :key="info.id">
                    <td>{{ info.label }}</td>
                    <td v-if="info.field_type != 64">{{ info.value }}</td>
                    <td v-if="info.field_type == 64">
                      <v-icon v-if="info.value == 1" color="green">mdi-check</v-icon>
                      <v-icon v-if="info.value != 1" color="red">mdi-close</v-icon>
                    </td>
                  </tr>
          </tbody>
        </v-simple-table>
        <v-btn block color="secondary" class="mt-5" small :href="'https://min.speiding.no/organisation/user/edit_profile/' + user_member_no">Endre kontaktinfo på Min speiding</v-btn>
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

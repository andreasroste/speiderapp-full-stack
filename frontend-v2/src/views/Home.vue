<template>
  <v-container>
      <v-row>
        <v-col class="col-md-4 col-sm-4">
          <h1 class="mb-3">Hei, {{user_first_name}}!</h1>
          <v-card>
            <v-card-text>
              Velkommen til speiderappen! <br>
              På denne siden finner du snarveier som er tilpasset deg, etter de rollene du har i Min speiding.
              <v-expansion-panels class="mt-3">
                <!-- <v-expansion-panel>
                  <v-expansion-panel-header>
                    Dine roller
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>level</th>
                          <th>body_id</th>
                          <th>role_key</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(role, id) in user_roles" :key="id">
                          <td>{{role.level}}</td>
                          <td>{{role.body_id}}</td>
                          <td>{{role.role_key}}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-expansion-panel-content>
                </v-expansion-panel> -->
                <v-expansion-panel>
                  <v-expansion-panel-header>Dine medlemsskap</v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <ul>
                      <li v-for="(ms, id) in user_memberships" :key="id">{{ms}}</li>
                    </ul>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="col-md-8 col-sm-8">
          <v-card class="mb-4" dark>
            <v-card-text>
              <v-btn dark depressed class="ma-1" color="#ff8400" href="https://agenda2021.no" target="_blank">
                  Agenda 2021 <v-icon>mdi-launch</v-icon>
              </v-btn>
              <v-btn dark depressed class="ma-1" color="primary" href="https://speidersport.no" target="_blank">
                  Speidersport <v-icon>mdi-launch</v-icon>
              </v-btn>
              <v-btn dark depressed class="ma-1" color="primary" href="https://speiding.no" target="_blank">
                  Speiding.no <v-icon>mdi-launch</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
          <v-card class="mb-4" v-for="(panel, id) in get_panels" :key="id">
            <v-card-text>
              <p class="text-caption">{{panel.name}} i {{find_group_name_in_memberships(panel.body_id)}}</p>
              <div v-for="(link,id) in panel.shortcuts" :key="id">
                <v-btn class="my-1" color="primary" v-if="link.type == 'ext'" :href="link.link" target="_blank" outlined>
                  {{link.title}} <v-icon>mdi-launch</v-icon>
                </v-btn>
                <v-btn class="my-1" color="primary" v-else-if="link.type == 'int'" :to="link.link" outlined>
                  {{link.title}}
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
  </v-container>
</template>

<style scoped>
h1{
  min-width: 300px;
}
</style>

<script>
export default {
  data() {
    return {
      contact_info_panel: [],
      photo_consent: false,
      panels: [
        /*{
          body:"project",
          role_key: "leader",
          name: "Prosjektleder",
          shortcuts: [
            {type: 'ext', title:"Se prosjektet i min speiding", link: 'https://min.speiding.no/activities/view/%body_id%'},
            {type: 'ext', title:"Prosjektleders verktøykasse", link: 'https://speiding.no/laer-ledelse/planlegging-og-prosjekter/prosjektarbeid'}
          ]
        },*/
        {
          body:"group",
          role_key: "leader",
          name: "Gruppeleder",
          shortcuts: [
            {type: 'int', title:"Gruppa i appen", link: '/group'},
            {type: 'ext', title:"Gruppa i min speiding", link: 'https://min.speiding.no/organisation/group/home/%body_id%'},
            {type: 'ext', title:"Administrer medlemmer", link: 'https://min.speiding.no/organisation/group/home/%body_id%#viewgroup_tabmenu_tab_allmembers_pane~manage'},
            {type: 'ext', title:"Informasjon om gruppedrift", link: 'https://speiding.no/grupper'}
          ]
        },
        {
          body:'group',
          role_key:'it_responsible',
          name: 'IT-ansvarlig',
          shortcuts: [
            {type: 'int', title:"Gruppa i appen", link: '/group'},
            {type: 'ext', title:"API-side", link: 'https://min.speiding.no/organisation/group/home/%body_id%#viewgroup_tabmenu_tab_api_pane'},
            {type: 'ext', title:"E-postlister", link: 'https://min.speiding.no/organisation/group/home/%body_id%#viewgroup_tabmenu_tab_messaging_pane'}
          ]
        },
        {
          body:'troop',
          role_key:'leader',
          name: 'Troppsleder',
          shortcuts: [
            {type: 'int', title:"Gruppa i appen", link: '/group'},
            {type: 'ext', title:"Administrer medlemmer", link: 'https://min.speiding.no/organisation/group/home/%body_id%#viewgroup_tabmenu_tab_allmembers_pane~manage'},
            {type: 'ext', title:"Troppen i Min speiding", link: 'https://min.speiding.no/organisation/troop/view/%body_id%'}
          ]
        },
        {
          body:'troop',
          role_key:'assistant_leader',
          name: 'Troppsassistent',
          shortcuts: [
            {type: 'int', title:"Gruppa i appen", link: '/group'},
            {type: 'ext', title:"Administrer medlemmer", link: 'https://min.speiding.no/organisation/group/home/%body_id%#viewgroup_tabmenu_tab_allmembers_pane~manage'},
            {type: 'ext', title:"Troppen i Min speiding", link: 'https://min.speiding.no/organisation/troop/view/%body_id%'}
          ]
        },
      ]
    };
  },
  computed: {
    user_full_name() {
      return this.$store.getters.user_full_name;
    },
    user_email() {
      return this.$store.state.user.data.email;
    },
    user_first_name() {
      return this.$store.state.user.data.first_name;
    },
    user_member_no() {
      return this.$store.state.user.data.member_no;
    },
    user_dob() {
      return this.$store.state.user.data.dob;
    },
    contactinfo() {
      return this.$store.getters.contact_info;
    },
    user_roles() {
      let roles = this.$store.state.user.roles;
      return roles;
    },
    user_memberships() {
      let result = [];
      let memberships = this.$store.state.user.data.memberships;
      
      if('group' in memberships){
        for (const groupid in memberships.group) {
          if (memberships.group.hasOwnProperty(groupid)) {
            const group = memberships.group[groupid];
            
            result.push(group.group.name);
          }
        }
      }
      return result;
    },
    get_panels() {
      let roles = this.$store.state.user.roles;
      let final_panels = [];
      for (const roleid in roles) {
        if (roles.hasOwnProperty(roleid)) {
          // Alle roller
          const role = roles[roleid];
          let usable_panel = this.panels.find((panel) => {
            // Alle paneler (this.panels)
            if(panel.body == role.level && panel.role_key == role.role_key) return true;
            else return false;
          });

          if(typeof usable_panel == 'undefined') continue;

          usable_panel.body_id=role.body_id;

          usable_panel.shortcuts.map(sc => {
            sc.link = sc.link.replace("%body_id%", role.body_id);
            return sc;
          });
          final_panels.push(usable_panel);
        }
      }
      return final_panels;
    }
  },
  methods: {
    find_group_name_in_memberships(id) {
      let memberships = this.$store.state.user.data.memberships;
      if('group' in memberships){
        if(id in memberships.group){
          return memberships.group[id]['group']['name'];
        }else{
          return id;
        }
      }else{
        return id;
      }
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

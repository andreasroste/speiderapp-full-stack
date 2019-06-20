<template>
    <div>
        <h1>Gruppe</h1>
        <v-progress-circular indeterminate v-if="!got_memberships"></v-progress-circular>
        <v-card v-for="group in groups" :key="group.id">
            <v-card-text>
                <h1>{{group.name}}</h1>
                <v-icon>home</v-icon> {{group.address.address_line1 || ''}}
                <div v-if="seeMembers">
                    <h2>Medlemmer</h2>
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="member in groupmembers[group.id].members" :key="member.member_no">
                            <template v-slot:header>
                                <div>
                                    <span class="grey--text">[{{member.member_no}}]</span> {{member.name | aeoeaa}}
                                    <span style="color: #97282e;" v-if="member.police_check.summary != 'Gyldig' && member.police_check.required">(sjekk politiattest) </span>
                                </div>
                            </template>
                            <v-card>
                                <v-card-text>
                                    <h3>{{member.name | aeoeaa}}</h3>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td class="font-weight-bold">Politiattest</td>
                                                <td>
                                                    <span v-if="!member.police_check.required" style="padding: 5px; border-radius: 3px; color: #63ac3b;">Trengs ikke. Alt i orden :)</span>
                                                    <span v-if="member.police_check.required">
                                                        <span v-if="member.police_check.summary == 'Gyldig'"><span style="padding: 5px; border-radius: 3px; color: #63ac3b;">Alt i orden! :)</span></span>
                                                        <span v-if="member.police_check.summary != 'Gyldig'"><span style="padding: 5px; border-radius: 3px; color: #97282e;">Oops! Her må det ordnes opp så fort som mulig.</span></span>
                                                    </span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="font-weight-bold">E-postadresse</td>
                                                <td>{{member.primary_email}}</td>
                                            </tr>
                                            <tr v-for="(info, id) in member.contact_info" :key="id">
                                                <td class="font-weight-bold">{{typeidtotype(info.type_id, group.id) | aeoeaa}}</td>
                                                <td>{{info.value | aeoeaa}}</td>
                                                <td v-if="info.type_id == 1 || info.type_id == 2 || info.type_id == 34 || info.type_id == 35"><v-btn style="background: #63ac3b; color: #fff;" :href="'tel:' + info.value" ><v-icon left dark>call</v-icon> Ring</v-btn></td>
                                                <td v-if="info.type_id == 13 || info.type_id == 15"><v-btn style="background: #63ac3b; color: #fff;" :href="'mailto:' + info.value"><v-icon left dark>email</v-icon> send e-post</v-btn></td>
                                                <td v-else></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </v-card-text>
                            </v-card>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    data() {
        return {
            groupmemberships: {},
            got_memberships: false,
            seeMembers: false,
            groupmembers: {}
        }
    },
    mounted() {
        let sessionstoredGroupmemberships = sessionStorage.getItem('group_memberships');
        if(sessionstoredGroupmemberships){
            this.groupmemberships = JSON.parse(sessionstoredGroupmemberships);
            this.got_memberships = true;
            this.getAllMembers();
        }else{
            this.$http.get('/api/memberships').then(response => {
                if(response.data.hasOwnProperty('group')){
                    this.groupmemberships = response.data.group
                    sessionStorage.setItem('group_memberships', JSON.stringify(response.data.group))
                }else{
                    this.groupmemberships = false
                    sessionStorage.setItem('group_memberships', false)
                }
                this.getAllMembers();
                this.got_memberships = true;
            }).catch((error) => {
                console.log(error)
                this.groupmemberships = false;
                // TODO: Gi feilmelding
            });
        }

        
        
        /*this.$http.get('/api/can/seemembers').then(response => {
            if(response.data == "true") this.seeMembers = true;
            else this.seeMembers = false;
        }).catch(() => {
            this.seeMembers = false;
        })*/

        this.seeMembers = true;
    },
    computed: {
        groups() {
            return this.got_memberships ? this.groupmemberships : false;
        }
    },
    methods: {
        getMembersInGroup(group_id){
            let sessionstored_members_in_group = sessionStorage.getItem('members_in_group_' + group_id);
            if(sessionstored_members_in_group){
                this.groupmembers[group_id] = JSON.parse(sessionstored_members_in_group)
            }else{
                this.$http.get('/api/getmembers/group/' + group_id).then(response => {
                    this.groupmembers[group_id] = response.data
                    sessionStorage.setItem('members_in_group_' + group_id, JSON.stringify(response.data));
                }).catch((error) => {
                    console.log(error)
                    // TODO: Gi en ordentlig feilmelding. Noe blinkende rødt eller noe.
                })
            }
        },
        getAllMembers() {
            for (const groupid in this.groupmemberships) {
                if (this.groupmemberships.hasOwnProperty(groupid)) {
                    let sessionstoredMembers = sessionStorage.getItem('members_in_group_' + groupid);

                    if(sessionstoredMembers){
                        this.groupmembers[groupid] = JSON.parse(sessionstoredMembers);
                    }else{
                        this.groupmembers[groupid] = this.getMembersInGroup(groupid);
                        sessionStorage.setItem('members_in_group_' + groupid, JSON.stringify(this.groupmembers[groupid]))
                    }
                }
            }
        },
        typeidtotype(typeid, groupid) {
            return this.groupmembers[groupid].contact_types[typeid].label
        }

    },
    filters: {
        aeoeaa(text) {
            return text
                .replace(new RegExp('&oslash;', 'g'), 'ø')
                .replace(new RegExp('&Oslash;', 'g'), 'Ø')
                .replace(new RegExp('&aring;', 'g'), 'å')
                .replace(new RegExp('&Aring;', 'g'), 'Å')
                .replace(new RegExp('&aelig;', 'g'), 'æ')
                .replace(new RegExp('&Aelig;', 'g'), 'Æ')
        }
    }
}
</script>

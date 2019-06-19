<template>
    <div>
        <h1>Gruppe</h1>
        <v-card v-for="group in groups" :key="group.id">
            <v-card-text>
                <h1>{{group.name}}</h1>
                <v-icon>home</v-icon> {{group.address.address_line1 || ''}}
                <div v-if="seeMembers">
                    <h2>Medlemmer</h2>
                    <v-expansion-panel>
                        <v-expansion-panel-content v-for="member in groupmembers.members" :key="member.member_no">
                            <template v-slot:header>
                                <div><span class="grey--text">[{{member.member_no}}]</span> {{member.name | aeoeaa}}</div>
                            </template>
                            <v-card>
                                <v-card-text>
                                    <pre>{{member}}</pre>
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
        this.$http.get('/api/memberships').then(response => {
            if(response.data.hasOwnProperty('group')){
                this.groupmemberships = response.data.group
            }else{
                this.groupmemberships = false
            }
            this.got_memberships = true;


            for (const groupid in this.groupmemberships) {
                if (this.groupmemberships.hasOwnProperty(groupid)) {
                    this.groupmembers = this.getMembersInGroup(groupid);
                }else{
                    console.error("HVORDAN HENGER DETTE SAMMEN!?!?!?!?!??!")
                }
            }
        }).catch((error) => {
            console.log(error)
            this.groupmemberships = false;
        });

        
        
        /*this.$http.get('/api/can/seemembers').then(response => {
            if(response.data == "true") this.seeMembers = true;
            else this.seeMembers = false;
        }).catch(() => {
            this.seeMembers = false;
        })*/

        this.seeMembers = true;
    },
    computed: {
        ...mapGetters(['user_memberships', 'user_role_ids']),
        groups() {
            return this.got_memberships ? this.groupmemberships : false;
        }
    },
    methods: {
        getMembersInGroup(group_id){
            this.$http.get('/api/getmembers/group/' + group_id).then(response => {
                this.groupmembers = response.data
                console.log('groupmembers', this.groupmembers.members)
            }).catch((error) => {
                console.log(error)
            })
        }
    },
    filters: {
        groupLeader(rolemembers){
            Object.keys(rolemembers).map(member_key => {
                let member = rolemembers[member_key];
                Object.keys(member.roles).map(role_key => {
                    let role = member.roles[role_key];
                    if(role.id === 1) return member.name;
                })
            })
        },
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

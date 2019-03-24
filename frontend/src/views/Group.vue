<template>
    <div>
        <h1>Gruppe</h1>
        <v-card>
            {{user_memberships}}
        </v-card>
        <v-card>
            <v-card-title>Dine roller for denne gruppa</v-card-title>
            <v-card-text>
                {{roles}}
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user_memberships', 'user_role_ids']),
        roles() {
            let memberships = this.user_memberships
            let all_roles = this.user_role_ids

            let roles_per_membership = []

            for(const membership_id in memberships){
                let membership = membersips[membership_id]
                let these_roles = all_roles.find((obj) => {
                    if(obj['body_id'] == membership['group_no']){
                        return true
                    }else{
                        return false
                    }
                })
                roles_per_membership.push({group_no: membership['group_no'], roles: these_roles})
            }

            return roles_per_membership
        }
    }
}
</script>

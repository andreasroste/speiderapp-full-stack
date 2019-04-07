<template>
    <div>
        <h1>Gruppe</h1>
        <v-card v-for="(group, id) in roles_per_group" :key="id">
            {{group.group_name}}
            <v-card-title><h3 class="headline">Roller</h3></v-card-title>
            <v-card-text>
                <ul>
                    <li v-for="(role, id) in group" :key="id">{{role}}</li>
                </ul>
            </v-card-text>
        </v-card>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user_memberships', 'user_role_ids']),
        roles_per_group() {
            let memberships = this.user_memberships // Gets the user's memberships
            let all_roles = this.user_role_ids  // Gets all of the user's roles

            let result = {}

            memberships.map((membership) => {   // Loops through the memberships
                result[membership['group_no']] = []
                result[membership['group_no']]['group_name'] = membership['name']

                let roles_in_membership = all_roles.filter((role) => {  // Filters all the user's roles to only the roles that is connected to the membership
                    return role['body_id'] == membership['group_no'] ? true : false
                })

                roles_in_membership.map((role) => { // Loops through the filtered roles
                    result[role['body_id']].push(role['roleid'])    // Adds role id to group property on result
                })
            })


            return result
        }
    }
}
</script>

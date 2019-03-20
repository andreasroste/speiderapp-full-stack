<template>
    <div>
        <h1>Gruppe</h1>
        <v-card>
            {{user_memberships}}
        </v-card>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters(['user_memberships'])
    }
}
</script>

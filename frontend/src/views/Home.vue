<template>
  <div>
    <h1>Profilside</h1>
    <v-card>
      <v-card-title>Fornavn</v-card-title>
      <v-card-text>{{user.first_name}}</v-card-text>
      <v-divider></v-divider>
      <v-card-title>Etternavn</v-card-title>
      <v-card-text>{{user.last_name}}</v-card-text>
      <v-divider></v-divider>
      <v-card-title>Epost</v-card-title>
      <v-card-text>{{user.email}}</v-card-text>
      <v-divider></v-divider>
      <v-card-title>Gruppe(r)</v-card-title>
      <v-treeview :items="user_memberships"></v-treeview>
      <v-divider></v-divider>
      <v-card-title>Roller</v-card-title>
      <pre>  
      <v-card dark v-for="(levels, id) in roles" :key="id">
        <v-card-title>{{levels.level}}</v-card-title>
        <v-card-text>{{levels.roles}}</v-card-text>
      </v-card>
      </pre>
    </v-card>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['user', 'user_memberships', 'roles'])
  }
}
</script>

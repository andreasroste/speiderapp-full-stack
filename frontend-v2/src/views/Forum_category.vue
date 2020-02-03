<template>
  <v-container>
    <h1>{{title}}</h1>
    <p>{{description}}</p>
    <v-card class="post-card" tile v-for="post in posts" :key="post._id" @click.native="openPost(post._id)">
        <v-card-title>
            {{post.title}}

        </v-card-title>
        <v-card-text>{{post.content}}</v-card-text>
        <v-card-actions>
            <v-chip
            small
            class="ma-2"
            color="primary"
            label
            >
                <v-icon small left>mdi-account-circle-outline</v-icon>
                {{post.author}}
            </v-chip>
            <v-chip
            small
            class="ma-2"
            color="primary"
            label
            >
                <v-icon small left>mdi-clock-outline</v-icon>
                {{post.date | formatDate}}
            </v-chip>
        </v-card-actions>
    </v-card>


    <v-dialog v-model="dialog" persistent max-width="600px">
       <template v-slot:activator="{ on }">
         <v-btn fab fixed bottom color="accent" v-on="on" right>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ny tråd</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                  label="Tittel"
                  required
                  v-model="newTitle"
                ></v-text-field>
            <v-text-field
                  label="Tekst"
                  required
                  v-model="newText"
                ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Lukk</v-btn>
          <v-btn color="green darken-1" text @click="makePost()">Publiser</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
    .post-card {
        margin-bottom: 10px;
    }
</style>

<script>

import moment from 'moment'

export default {
  data() {
    return {
      id: this.$route.params.id,
      posts: [],
      title: '',
      description: '',
      dialog: false,
      newTitle: '',
      newText: ''
    };
  },
  methods: {
      openPost(id) {
          this.$router.push({name: 'forumpost', params: {id}})
      },
      makePost() {
        const vm = this
        vm.dialog = false;
        this.$http.post('/api/forum/create/post', {
          title: vm.newTitle,
          content: vm.newText,
          categoryid: vm.id
        }).then(() => {
            this.$http.get('/api/forum/traads', {
                params: {
                    id: vm.id
                }
            }).then(res => {
                vm.posts = res.data.result
                vm.title = res.data.category.title
                vm.description = res.data.category.description
            })
        })
      }
  },
  filters: {
      formatDate(s) {
          moment.locale('nb');
          return moment(s).calendar();
      }
  },
  mounted() {
    const vm = this
    this.$http.get('/api/forum/traads', {
        params: {
            id: vm.id
        }
    }).then(res => {
        vm.posts = res.data.result
        vm.title = res.data.category.title
        vm.description = res.data.category.description
    })
  }
};
</script>

<template>
  <v-container>
    <h1>Forum</h1>
    <p>Her kan det diskuteres! (Så lenge det er plass på serveren, da...)</p>
    <v-card class="category-card" tile v-for="cat in categories" :key="cat._id" @click.native="openCategory(cat._id)">
        <v-card-title>{{cat.title}}</v-card-title>
        <v-card-text>{{cat.caption}}</v-card-text>
        <v-card-actions></v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="600px">
       <template v-slot:activator="{ on }">
         <v-btn fab fixed bottom color="accent" v-on="on" right v-if="hasAccessToMakeCat">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ny kategori</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
                  label="Navn på kategori"
                  required
                  v-model="newName"
                ></v-text-field>
            <v-text-field
                  label="Beskrivelse"
                  required
                  v-model="newDesc"
                ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">Lukk</v-btn>
          <v-btn color="green darken-1" text @click="makeCat()">Lag ny kategori</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>


  </v-container>
</template>

<style scoped>
    .category-card {
        margin-bottom: 10px;
    }
</style>

<script>
export default {
  data() {
    return {
      categories: [],
      dialog: false,
      newName: '',
      newDesc: ''
    };
  },
  methods: {
      openCategory(id) {
          this.$router.push({name: 'forumcategory', params: {id}})
      },
      makeCat() {
        const vm = this
        vm.dialog = false;
        this.$http.post('/api/forum/create/category', {
          name: vm.newName,
          description: vm.newDesc
        }).then(() => {
          this.$http.get('/api/forum/cats').then(res => {
              vm.categories = res.data.result
          })
        })
      }
  },
  computed: {
    hasAccessToMakeCat(){
      if(this.$store.state.user.app_access.includes('1') || this.$store.state.user.app_access.includes('2001')) return true;
      else return false;
    }
  },
  mounted() {
    const vm = this
    this.$http.get('/api/forum/cats').then(res => {
        vm.categories = res.data.result
    })
  }
};
</script>

<template>
  <div>
    <div class="page">
      <v-btn @click="$router.go(-1)" absolute top left fab id="back_btn">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-img
        v-if="event.image_url"
        :src="event.image_url"
        aspect-ratio="1.618"
      ></v-img>
      <div class="box">
        <v-progress-circular id="loadspin" v-if="!loaded"></v-progress-circular>
        <h2>{{ event.name }}</h2>
        <div v-if="event.location">
          <v-icon>mdi-map-marker</v-icon>
          {{ event.location }}
        </div>
        <div v-if="event.date">
          <v-icon>date_range</v-icon>
          {{ event.date }}
        </div>
        <div v-if="event.fee">
          <v-icon>attach_money</v-icon>
          {{ event.fee }}
        </div>
        <br />
        <div class="desc" v-if="event.desc">{{ event.desc }}</div>
        <br />
        <div v-if="event.body" v-html="event.body"></div>
      </div>
      <v-btn v-if="event.registration_link" :href="event.registration_link">Gå til påmelding</v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      event: {},
      error: false,
      loaded: false
    };
  },
  mounted() {
    if (this.$route.params.id) {
      let vm = this;
      axios
        .get("/api/event/" + this.$route.params.id)
        .then(response => {
          vm.event = response.data;
          vm.loaded = true;
        })
        .catch(() => {
          vm.error = true;
          vm.loaded = true;
        });
    } else {
      this.error = true;
      this.loaded = true;
    }
  }
};
</script>

<style scoped>
.image > .v-parallax__image-container {
  filter: blur(5px);
}
.desc {
  font-weight: bold;
}
.page {
  width: 90vw;
  margin: 10px auto;
  max-width: 700px;
}
.box {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid black;
  border-top: none;
  border-radius: 0 0 20px 20px;
  padding: 10px;
  padding-bottom: 25px;
  position: relative;
  width: 100%;
}
#back_btn {
  top: auto;
  height: 47px;
  width: 47px;
}
#loadspin {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>

<template>
    <div>
        <div class="page">
            <v-img v-if="current_event.image_url" :src="current_event.image_url" aspect-ratio="1.618"></v-img>
            <div class="box">
                <h2>{{ current_event.name }}</h2>
                <div v-if="current_event.location"><v-icon>location_on</v-icon>{{current_event.location}}</div>
                <div v-if="current_event.date"><v-icon>date_range</v-icon>{{current_event.date}}</div>
                <div v-if="current_event.fee"><v-icon>attach_money</v-icon>{{current_event.fee}}</div>
                <br>
                <div class="desc" v-if="current_event.desc">{{current_event.desc}}</div>
                <br>
                <div v-if="current_event.body" v-html="current_event.body"></div>
            </div>
            <v-btn v-if="current_event.registration_link" :href="current_event.registration_link" >Gå til påmelding</v-btn>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['current_event'])
    }
}
</script>

<style scoped>
    .image > .v-parallax__image-container {
        filter:blur(5px);
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
		border-radius: 20px;
		padding: 10px;
		padding-bottom: 25px;
		position: relative;
		width: 100%;
    }
</style>

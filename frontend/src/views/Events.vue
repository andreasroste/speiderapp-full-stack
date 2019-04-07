<template>
		<div class="page">
			<v-btn absolute top left fab id="filter_btn" color="blue"><v-icon>menu</v-icon></v-btn>
			<h1>Arrangementer</h1>
			<v-progress-circular indeterminate v-if="loading"></v-progress-circular>
			<br>
			<div class="events">
				<Event
					v-for="event in events"
					:key="event.id"
					:title="event.title"
					:desc="event.desc"
					:position="event.position"
					:start_date="event.start_date"
					:end_date="event.end_date"
					:registration="event.registration"
					:img_url="event.img_url"
					:body="event.body"
					:age_groups="event.age_groups"
				/>
			</div>
			<v-btn id="new_event_btn" fab ripple color="#2baccc" to="/events/create">
				<v-icon>add</v-icon>
			</v-btn>
		</div>
</template>

<style scoped>
	h1 {
		text-align: center;
		flex: 1;
	}

	.page {
		position: relative;
	}

	#new_event_btn {
		position: fixed;
		bottom: 80px;
		right: 10px;
	}

	#filter_btn {
		top: auto;
		height: 47px;
		width: 47px;
	}

	.events {
		width: 90vw;
		margin: 10px auto;
		max-width: 900px;
	}
	.flex {
		display: flex;
		padding: 0 15px;
	}

	@media screen and (max-width: 400px) {
		h1 {
			margin-left: 70px;
		}
	}
</style>


<script>
	import Event from "../components/Event";
	import axios from "axios";

	export default {
		components: {
			Event
		},
		data: () => {
			return {
				events: {},
				loading: true
			};
		},
		methods: {
			getEvents() {
				const vm = this;
				axios.get("/api/events").then(response => {
                    sessionStorage.setItem('speiding_no_events', JSON.stringify(response.data))
					vm.events = response.data;
					vm.loading = false;
                }).catch(() => {
					vm.loading = false;
                    vm.$notify({
                        group: "varsel",
                        title: "En feil oppsto",
                        text: "Jeg klarte ikke å hente info fra speiding.no :("
                    });
                });
			}
		},
		created() {
			const events = sessionStorage.getItem("speiding_no_events");
			if (events) {
				this.loading = false;
				this.events = JSON.parse(events);
			} else {
				this.getEvents();
			}
		}
	};
</script>

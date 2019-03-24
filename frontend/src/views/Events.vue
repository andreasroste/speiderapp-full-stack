<template>
	<v-container>
		<div>
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
				/>
			</div>
		</div>
	</v-container>
</template>

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

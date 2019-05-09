<template>
		<div class="page">
			<div class="page-header">
				<v-btn fab id="filter_btn" @click="toggle_filter"><v-icon>menu</v-icon></v-btn>
				<h1>Arrangementer</h1>
			</div>
			<v-progress-circular indeterminate v-if="loading"></v-progress-circular>
			<br>
			<div class="events">
				<Event
					v-for="event in events"
					:key="event.id"
					:title="event.title"
					:desc="event.desc"
					:position="event.position"
					:date="formatDate(event.start_date, event.end_date)"
					:registration="event.registration"
					:img_url="event.img_url"
					:body="event.body"
					:age_groups="event.age_groups"
					@clicked="gotoEvent(event)"
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
		margin: 0 auto;
		width: 100%;
		padding: 0;
		display: inline-block;
	}

	.page {
		position: relative;
	}

	.page-header{
		padding: 5px;
		position: relative;
	}

	#new_event_btn {
		position: fixed;
		bottom: 80px;
		right: 10px;
	}

	#filter_btn {
		top: auto;
		height: 40px;
		width: 40px;
		display: inline-block;
		margin: 0;
		position: absolute;
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
		/* h1 {
			font-size: 75%;
		} */
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
			},
			gotoEvent(event) {
				this.$store.dispatch('gotoEvent', {
					name: event.title,
					location: event.position,
					fee: event.fee,
					image_url: event.img_url,
					desc: event.desc,
					body: event.body,
					registration_link: event.registration,
					date: this.formatDate(event.start_date, event.end_date)
				});
				this.$router.push('/events/view');
			},
			formatDate(start, end) {
				const start_date = new Date(start);
				const end_date = new Date(end);

				if (start == "") {
					return (
						end_date.getDate() +
						". " +
						this.nor_month(end_date.getMonth()) +
						" " +
						end_date.getFullYear()
					); // Samme dag.
				}

				if (end == "") {
					return (
						start_date.getDate() +
						". " +
						this.nor_month(start_date.getMonth()) +
						" " +
						start_date.getFullYear()
					); // Samme dag.
				}

				if (start_date.getYear() == end_date.getYear()) {
					if (start_date.getMonth() == end_date.getMonth()) {
						if (start_date.getDate() == end_date.getDate()) {
							return (
								start_date.getDate() +
								". " +
								this.nor_month(start_date.getMonth()) +
								" " +
								start_date.getFullYear()
							); // Samme dag.
						}
						return (
							start_date.getDate() +
							".-" +
							end_date.getDate() +
							". " +
							this.nor_month(start_date.getMonth()) +
							" " +
							start_date.getFullYear()
						); // Lik måned og år, ulik dato
					}
					return (
						start_date.getDate() +
						". " +
						this.nor_month(start_date.getMonth()) +
						" - " +
						end_date.getDate() +
						". " +
						this.nor_month(end_date.getMonth()) +
						" " +
						start_date.getFullYear()
					); // Likt år, ulik måned
				} else {
					return (
						start_date.getDate() +
						". " +
						this.nor_month(start_date.getMonth()) +
						" " +
						start_date.getFullYear() +
						" - " +
						end_date.getDate() +
						". " +
						this.nor_month(end_date.getMonth()) +
						" " +
						end_date.getFullYear()
					); // Ulikt år
				}
			},
			nor_month(month) {
				let translated_month = "";

				switch (month) {
					case 0:
						translated_month = "januar";
						break;
					case 1:
						translated_month = "februar";
						break;
					case 2:
						translated_month = "mars";
						break;
					case 3:
						translated_month = "april";
						break;
					case 4:
						translated_month = "mai";
						break;
					case 5:
						translated_month = "juni";
						break;
					case 6:
						translated_month = "juli";
						break;
					case 7:
						translated_month = "august";
						break;
					case 8:
						translated_month = "september";
						break;
					case 9:
						translated_month = "oktober";
						break;
					case 10:
						translated_month = "november";
						break;
					case 11:
						translated_month = "desember";
						break;

					default:
						translated_month = "(måned ikke funnet)";
						break;
				}

				return translated_month;
			},
			toggle_filter() {
				
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

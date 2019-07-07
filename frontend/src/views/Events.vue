<template>
	<div>
		<div class="page-header">
			<v-btn @click="filtering = !filtering" fab id="filter_btn">
				<v-icon v-if="!filtering">menu</v-icon>
				<v-icon v-if="filtering">close</v-icon>
			</v-btn>
			<h1>Arrangementer</h1>
		</div>
		<div class="filtermenu" v-if="filtering">
			<h3>TYPE</h3>
			<div class="grid-3">
				<div :class="{ filtermenubutton: true, filter_active: filters.group }" @click="filters.group = !filters.group">
					Gruppe
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.district }" @click="filters.district = !filters.district">
					Krets
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.organisation }" @click="filters.organisation = !filters.organisation">
					Forbund
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.international }" @click="filters.international = !filters.international">
					Internasjonalt
				</div>
			</div>
			<h3>ALDERSGRUPPE</h3>
			<div class="grid-3">
				<div :class="{ filtermenubutton: true, filter_active: filters.smaspeider }" @click="filters.smaspeider = !filters.smaspeider">
					Småspeider
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.stifinner }" @click="filters.stifinner = !filters.stifinner">
					Stifinner
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.vandrer }" @click="filters.vandrer = !filters.vandrer">
					Vandrer
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.rover }" @click="filters.rover = !filters.rover">
					Rover
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.leder }" @click="filters.leder = !filters.leder">
					Leder
				</div>
				<div :class="{ filtermenubutton: true, filter_active: filters.other_audience }" @click="filters.other_audience = !filters.other_audience">
					Annet
				</div>
			</div>
		</div>
		<v-progress-circular indeterminate v-if="loading"></v-progress-circular>
		<br />
		<div class="events">
			<Event
				v-for="event in filtered_events"
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
		<!-- TODO: Gjør denne tilgjengelig for flere enn bare meg. -->
		<v-btn id="new_event_btn" fab ripple color="#2baccc" to="/events/create" v-if="$store.getters.user.member_no == 200660">
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

	h3 {
		margin-bottom: 10px;
	}

	.page-header {
		padding: 5px;
		z-index: 100;
		width: 100%;
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
	.filtermenu {
		width: 100%;
		display: block;
		background: #eee;
		padding: 10px;
		position: fixed;
		top: 100px;
		left: 0;
		right: 0;
		z-index: 10;
	}
	.filtermenubutton {
		border-radius: 10px;
		background: rgba(255, 255, 255, 0.6);
		border: 1px solid rgb(89, 101, 120);
		text-align: center;
		display: inline-block;
	}
	.filter_active {
		background: red;
	}
	.grid-3 {
		display: grid;
		grid-gap: 5px;
		grid-column-gap: 5px;
		grid-template-columns: 33% 33% 33%;
		margin-bottom: 20px;
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
				filters: {
					group: false,
					district: false,
					organisation: false,
					international: false,
					smaspeider: false,
					stifinner: false,
					vandrer: false,
					rover: false,
					leder: false,
					other_audience: false
				},
				loading: true,
				filtering: false
			};
		},
		methods: {
			getEvents() {
				const vm = this;
				axios
					.get("/api/events")
					.then(response => {
						sessionStorage.setItem(
							"speiding_no_events",
							JSON.stringify(response.data)
						);
						vm.events = response.data;
						vm.filtered_events = response.data;
						vm.loading = false;
					})
					.catch(() => {
						vm.$store.dispatch("showSnackbar", {
							text: "Kunne ikke laste inn arrangementer.",
							color: "error"
						});
					});
			},
			gotoEvent(event) {
				this.$router.push("/events/" + event.id);
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
		},
		computed: {
			filtered_events() {
				return this.events.filter(e => {
					if (!this.filters.smaspeider &&
						!this.filters.vandrer &&
						!this.filters.rover &&
						!this.filters.leder){
						return true;
					}

					if (this.filters.smaspeider && e.age_groups.includes("7394")){
						return true;
					}
					if (this.filters.vandrer && e.age_groups.includes("7278")){
						return true;
					}
					if (this.filters.rover && e.age_groups.includes("7395")){
						return true;
					}
					if (this.filters.leder && e.age_groups.includes("7277")){
						return true;
					}
					return false;
				});
			}
		}
	};
</script>

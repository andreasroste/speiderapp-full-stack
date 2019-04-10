<template>
	<div class="event">
		<div class="flex event-meta">
			<a class="event-name" @click.prevent="gotoEvent(event)">{{ title }}</a>
			<div class="event-date">{{ formatDate(start_date, end_date) }}</div>
		</div>
		<div class="flex flex-dir">
			<div class="event-box border-default">
				<div class="flex">
					<img :src="img_url" v-if="img_url != ''" class="event-image">
					<span class="event-desc">{{ desc }}</span>
				</div>
				<div class="dots">
					<div v-if="age_groups.includes('7394')" class="dot bg-smaspeider"></div>
					<div v-if="age_groups.includes('7278')" class="dot bg-vandrer"></div>
					<div v-if="age_groups.includes('7395')" class="dot bg-rover"></div>
					<div v-if="age_groups.includes('7277')" class="dot bg-leder"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [
			"title",
			"desc",
			"body",
			"start_date",
			"end_date",
			"registration",
			"position",
			"img_url",
			"age_groups"
		],
		methods: {
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
		}
	};
</script>


<style scoped>
	.flex {
		display: flex;
	}
	.flex-dir {
		flex-direction: column;
	}
	.event {
		margin-bottom: 15px;
	}
	.event-name {
		display: inline-block;
		font-weight: bold;
		flex: 1;
		margin-right: 5px;
		font-size: 15px;
		line-height: 1.2;
	}
	.event-date {
		display: inline-block;
		font-size: 15px;
	}
	.event-meta {
		margin-bottom: 5px;
	}
	.event-image {
		border-radius: 10px;
		width: 90px;
		height: 90px;
		margin-right: 5px;
		object-fit: cover;
	}
	.event-desc {
		flex: 1;
		word-break: normal;
		font-size: 15px;
	}
	.event-box {
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid black;
		border-radius: 20px;
		padding: 10px;
		padding-bottom: 25px;
		position: relative;
		width: 100%;
	}
	.dots {
		display: flex;
		bottom: 0;
		right: 10px;
		position: absolute;
	}
	.dot {
		display: block;
		width: 15px;
		height: 15px;
		margin-bottom: 5px;
		margin-right: 5px;
		border-radius: 40%;
	}
</style>

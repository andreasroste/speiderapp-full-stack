<template>
  <v-layout>
    <v-flex>
      <v-card>
        <v-img
          :src="img_url"
          aspect-ratio="3.236"
        ></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{title}}</h3>
						<v-icon>date_range</v-icon> {{formatDate(start_date, end_date)}}<br>
						<v-icon>location_on</v-icon> {{position}}
            <div class="desc"> {{ desc }} </div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn :href="registration" target="_blank" flat color="#4d647c">Gå til påmelding</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
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
			"img_url"
		],
		methods: {
			formatDate(start, end) {
				const start_date = new Date(start);
				const end_date = new Date(end);

				if(start == '') {
					return (
						end_date.getDate() +
						". " +
						this.nor_month(end_date.getMonth()) +
						" " +
						end_date.getFullYear()
					); // Samme dag.
				}

				if (end == ""){
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
				let translated_month = '';

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
	.v-card {
		margin-bottom: 30px;
	}
	.desc {
		margin-top: 20px;
	}
</style>

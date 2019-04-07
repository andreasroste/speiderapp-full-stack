<template>
	<div>
		<h1>Din profil</h1>
		<div class="profile">
			<img src="https://picsum.photos/395" alt class="profileimg border-default">
			<div class="profilegroup">
				<span class="profiletitle">Navn</span>
				<div class="profilevalue">{{user.first_name + ' ' + user.last_name}}</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">E-post</span>
				<div class="profilevalue">{{user.email}}</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">Roller</span>
				<div class="profilevalue">
					<v-card dark v-for="(levels, id) in roles" :key="id">
						<v-card-title>{{levels.level}}</v-card-title>
						<v-card-text>{{levels.roles}}</v-card-text>
					</v-card>
				</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">QR-kode</span>
				<div class="profilevalue" style="text-align: center">
					<qriously :value="this.qr_value" :size="200"/>
				</div>
			</div>
			<router-link to="/logout" class="s-btn">Logg ut</router-link>
		</div>
		<div class="onesignal-customlink-container"></div>
	</div>
</template>

<style scoped>
	.profile {
		width: 90vw;
		max-width: 900px;
		margin: 0 auto;
	}

	.profileimg {
		border-radius: 50%;
		margin: 0 auto;
		display: block;
		background: white;
		width: 50vw;
		height: 50vw;
		max-width: 250px;
		max-height: 250px;
	}

	.profiletitle {
		font-weight: 1000;
		text-transform: uppercase;
	}

	.profilevalue {
		margin-top: 3px;
		margin-bottom: 13px;
		background: rgba(255, 255, 255, 0.5);
		border: 1px solid black;
		border-radius: 10px;
		padding: 10px;
	}
</style>


<script>
	import { mapGetters } from "vuex";

	export default {
		computed: {
			...mapGetters(["user", "user_memberships", "roles"])
		}
	};
</script>

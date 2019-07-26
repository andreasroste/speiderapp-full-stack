<template>
	<div>
		<h1>Din profil</h1>
		<div class="profile">
			<img src="/api/profileimage" alt class="profileimg border-default">
			<div class="profilegroup">
				<span class="profiletitle">Navn</span>
				<div class="profilevalue">{{user.first_name + ' ' + user.last_name}}</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">E-post</span>
				<div class="profilevalue">{{user.email}}</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">Medlemsskap</span>
				<div class="profilevalue">
					<ul>
						<li v-for="(memship, id) in user_memberships.group" :key="id">{{memship.name}}</li>
					</ul></div>
			</div>
			<!--<div class="profilegroup">
				<span class="profiletitle">Roller</span>
				<div class="profilevalue">
					<v-card dark v-for="(role, id) in roles" :key="id">
						<v-card-title>Rolle på {{role.level | level_to_human}} ({{role.body_id}})</v-card-title>
						<v-card-text>{{role}}</v-card-text>
					</v-card>
				</div>
			</div>-->
			<span>Du kan endre profilinnstillingene på <a target="_blank" :href="'https://min.speiding.no/organisation/user/edit_profile/' + user.member_no">min speiding.</a></span>
			<router-link to="/logout" class="s-btn">Logg ut</router-link>
		</div>
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
		},
		filters: {
			level_to_human(level) {
				switch (level) {
					case 'organisation':
						return 'forbundsnivå'
					case 'project':
						return 'prosjektnivå'
					case 'district':
						return 'kretsnivå'
					case 'group':
						return 'gruppenivå'
					case 'patrol':
						return 'patruljenivå'
					case 'troop':
						return 'enhetsnivå'
				
					default:
						return 'udefinert nivå'
				}
			}
		}
	};
</script>

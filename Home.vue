<template>
	<div>
		<h1>Din profil</h1>
		<div class="profile">
			<img src="https://picsum.photos/395" alt="" class="profileimg border-default">
			<div class="profilegroup">
				<span class="profiletitle">Navn</span>
				<div class="profilevalue">
					{{ name }}
				</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">Gruppe</span>
				<div class="profilevalue">
					<!-- TODO: key kan ikke være group, men må være group.key. Samme med den under. -->
					<span :key="group" v-for="group in getMemberGroups">{{group}}</span>
				</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">Krets</span>
				<div class="profilevalue">
					Granskogen krets
				</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">Roller</span>
				<div class="profilevalue">
					<ul>
						<li :key="instance.id" v-for="instance in getMemberRoles">
							{{instance.level}} ({{instance.id}})
							<ul>
								<li :key="role" v-for="role in instance.roles">{{role}}</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
			<div class="profilegroup">
				<span class="profiletitle">QR-kode</span>
				<div class="profilevalue" style="text-align: center">
					<qriously :value="this.qr_value" :size="200" />
				</div>
			</div>
			<div class='onesignal-customlink-container'></div>
		</div>
	</div>
</template>

<style scoped>
h1 {
	text-align: center;
}

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
	text-transform: capitalize;
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
import { mapState, mapGetters } from 'vuex';
import axios from 'axios';


const map_state = mapState({
	name: state => state.user.memberdata.first_name + ' ' + state.user.memberdata.last_name,
	gruppe: state => state.user.memberdata.memberships
});

const map_getters = mapGetters([
	'getMemberGroups',
	'getMemberRoles'
])

export default {
	name: 'home',
	data: () => {
		return {
			qr_value: ''
		}
	},
	created() {
		const qr_value = sessionStorage.getItem('profile_qr_value');
		if(qr_value) {
			this.qr_value = qr_value;
		}else{
			this.getQrValue();
		}
	},
	methods: {
		getQrValue() {
				const vm = this;
				axios.get("/api/qrprofile", {
					params: {
						member_no: vm.$store.state.user.memberdata.member_no
					},
					headers: {
						Authorization: 'Bearer ' + sessionStorage.getItem('token')
					}
				}).then(response => {
                    sessionStorage.setItem('profile_qr_value', response.data.code)
                    vm.qr_value = response.data.code;
                }).catch(e => {
                    vm.$notify({
                        group: "varsel",
                        title: "Nettverksfeil",
                        text: "En nettverksfeil gjorde det vanskelig å hende QR-koden"
                    });
                });
		}
	},
	computed: Object.assign({}, map_state, map_getters) // Vi må gjøre dette for at Edge skal skjønne hva vi skriver.
}
</script>

<template>
	<div>
		<img id="logo" src="@/assets/logo.png" alt>

		<form action="/api/login" method="POST" @submit.prevent="login">
			<input
				type="text"
				v-model="username"
				id="username"
				autocomplete="username"
				:placeholder="$t('member_no_or_email')"
			>
			<input
				type="password"
				v-model="password"
				id="password"
				autocomplete="password"
				:placeholder="$t('password')"
			>
			<a href="https://min.speiding.no/request_password" class="gp">{{ $t('forgot_password') }}</a>
			<input type="submit" class="submit" :disabled="button_disabled" :value="$t('login')">
		</form>
		<v-btn block flat class="blispeider" href="https://blispeider.no">Vil du finne informasjon om speiding, eller bli en selv?</v-btn>
	</div>
</template>

<style scoped>
	* {
		outline: rgba(0, 0, 0, 0.4);
	}

	.submit {
		display: block;
		border-radius: 20px;
		padding: 10px 30px;
		border: none;
		background: rgba(255, 255, 255, 0.4);
		margin: 10px auto;
	}

	.blispeider {
		max-width: 500px;
		width: 75vw;
		margin: 10px auto;
		margin-top: 10vh;
		word-wrap: break-word;
	}

	a.gp {
		color: rgba(0, 0, 0, 0.4);
		font-size: 75%;
		text-align: center;
		display: block;
		width: 100%;
	}
	#logo {
		display: block;
		width: 60%;
		max-width: 200px;
		margin: 0 auto;
		margin-bottom: 30px;
	}

	#username,
	#password {
		text-align: center;
		border: 1px solid black;
		border-radius: 20px;
		padding: 10px;
		width: 75vw;
		max-width: 500px;
		margin: 10px auto;
		display: block;
	}
</style>


<script>
	import log from "../log";

	export default {
		data: () => {
			return {
				username: "",
				password: "",
				button_disabled: false
			};
		},
		methods: {
			login() {
				this.button_disabled = true;
				let username = this.username;
				let password = this.password;
				let vm = this

				this.$store
					.dispatch("login", { username, password })
					.then(() => {
						this.$router.push("/");
					})
					.catch(err => {
						this.button_disabled = false;
						log.error(err);

						vm.$notify({
							group: "a",
							title: vm.$t('an_error_happened'),
							text: vm.$t("wrong_password")
						});
					});
			}
		}
	};
</script>

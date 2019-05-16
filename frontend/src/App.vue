<template>
	<v-app>
		<v-progress-circular indeterminate v-if="!this.ready"></v-progress-circular>
		<div id="app" :style="{ height: appHeight }" v-if="this.ready">
			<router-view id="approuter"></router-view>
			<Dockbar id="dockbar" v-if="this.$store.getters.isLoggedIn"></Dockbar>
		</div>
		<v-snackbar
			v-model="$store.state.snackbar.visible"
			:color="$store.state.snackbar.color"
			:timeout="$store.state.snackbar.timeout"
		>
			{{ $store.state.snackbar.text }}
			<v-btn dark flat @click="$store.dispatch('closeSnackbar')">Close</v-btn>
		</v-snackbar>

		<v-layout row justify-center>
			<v-dialog v-model="installDialog" persistent max-width="290">
				<v-card>
					<v-card-title class="headline">Use Google's location service?</v-card-title>
					<v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn color="red darken-1" flat @click="installDialog = false">Lukk</v-btn>
						<v-btn color="green darken-1" flat @click="installApp()">Installér</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-layout>
	</v-app>
</template>

<script>
	// import Navbar from './components/Navbar.vue'
	import Dockbar from "./components/Dockbar.vue";

	import { mapGetters } from "vuex";

	export default {
		data() {
			return {
				transitionName: "slide-left",
				ready: false,
				appHeight: window.innerHeight + "px",
				installDialog: false,
				installevent: null
			};
		},
		components: {
			Dockbar
		},
		computed: {
			...mapGetters(["isLoggedIn"])
		},
		watch: {
			$route(to, from) {
				const toDepth = to.path.split("/").length;
				const fromDepth = from.path.split("/").length;
				this.transitionName =
					toDepth < fromDepth ? "slide-right" : "slide-left";
			}
		},
		methods: {
			resizeHandler() {
				this.appHeight = window.innerHeight + "px";
			},
			installApp(){
				this.installDialog = false;
				this.installevent.prompt();
			}
		},
		mounted() {
			window.addEventListener("resize", this.resizeHandler);
			this.ready = true;
			window.addEventListener('beforeinstallprompt', e => {
				e.preventDefault();
				this.installevent = e;
				this.installDialog = true;
			})
		}
	};
</script>

<style>
	@font-face {
		src: url(assets/fonts/dinot.otf);
		font-family: "DINOT";
	}
	html,
	body {
		overflow-y: hidden;
		height: 100%;
	}
	* {
		box-sizing: border-box;
		font-family: "DINOT";
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		-webkit-user-select: none;
		-webkit-tap-highlight-color: transparent;
		-webkit-touch-callout: none;
	}

	h1 {
		text-transform: uppercase;
		letter-spacing: 2px;
		text-align: center;
	}

	.s-btn {
		display: block;
		border-radius: 30px;
		padding: 10px 30px;
		border: none;
		background: rgba(255, 255, 255, 0.6);
		margin: 10px auto;
		text-align: center;
		color: black;
		text-decoration: none;
	}

	#app {
		background: linear-gradient(
				rgba(89, 101, 120, 0.1),
				rgba(89, 101, 120, 0.1)
			),
			url(./assets/logos/700x700-hvit.png);
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	#approuter {
		flex: 1;
		overflow-y: auto;
		-webkit-overflow-scrolling: touch;
		padding-top: 26px;
	}

	.bg-smaspeider {
		background: #f2cc07;
	}
	.bg-stifinner {
		background: #4d647c;
	}
	.bg-vandrer {
		background: #63ac3b;
	}
	.bg-rover {
		background: #751052;
	}
	.bg-leder {
		background: #2baccc;
	}

	@media screen and (max-width: 780px) {
	}
</style>

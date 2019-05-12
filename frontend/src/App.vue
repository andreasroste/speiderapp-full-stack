<template>
	<v-app>
    <v-progress-circular indeterminate v-if="!this.ready"></v-progress-circular>
		<div id="app" :style="{ height: appHeight }" v-if="this.ready">
			<router-view id="approuter"></router-view>
			<Dockbar id="dockbar" v-if="this.$store.getters.isLoggedIn"></Dockbar>
		</div>
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
        appHeight: window.innerHeight + 'px'
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
				// let vh = window.innerHeight * 0.01;
        this.appHeight = window.innerHeight + 'px';
			}
		},
		mounted() {
			window.addEventListener("resize", this.resizeHandler);
      this.ready = true;
		}
	};
</script>

<style>
	@font-face {
		src: url(assets/fonts/dinot.otf);
		font-family: "DINOT";
	}
	html, body {
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

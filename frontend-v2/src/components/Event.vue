<template>
	<div class="event">
		<div class="flex event-meta">
			<a class="event-name">{{ title }}</a>
			<div class="event-date">{{ date }}</div>
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
			"date",
			"registration",
			"position",
			"img_url",
			"age_groups"
		]
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

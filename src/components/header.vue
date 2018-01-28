<template>
	<header>
		<section>
			<h1>Castform</h1>
		</section>
		<section>
			<app-search></app-search>
		</section>
	</header>
</template>

<script>
	import Search from './search.vue';
	export default {
		data() {
			return {

			}
		},
		components: {
			'app-search': Search
		}
	}
</script>

<style>
	header {
		display: flex;
		flex-direction: row;
		background: linear-gradient(rgba(0, 0, 0, 0.1), transparent);
		height: 56px;
	}
	header section {
		display: inline-flex;
		flex: 1;
		justify-content: center;
		margin: auto;
	}
	header section:first-child {
		justify-content: flex-start;
		margin-left: 1rem;
	}
	header section:last-child {
		justify-content: flex-end;
		margin-right: 1rem;
	}
	header h1 {
		margin: auto 0;
	}
	i {

	}
</style>
<template>
  <div id="main_app">
    <current-forecast></current-forecast>
  </div>
</template>

<script>
	import Current from './components/current_forecast.vue';
	export default {
		data() {
			return {

			}
		},
		components: {
			'current-forecast': Current
		}
	}
</script>

<style>
	#main_app {
		margin: 0 1rem;
	}
</style>
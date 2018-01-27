<template>
	<form @submit.prevent="fetchLocationSuggestions">
		<input v-model="query" type="text">		
	</form>
</template>

<script>
	export default {
		props: ['city'],
		data () {
			return {
				query: ''
			}
		},
		methods: {
			fetchLocationSuggestions() {
				alert(this.query);
			}
		}
	}
// For city search:
// api.openweathermap.org/data/2.5/weather?q={city name}&APPID={APIKEY}
</script>

<style>
	form {
		margin: auto 0;
	}
	input {
		background: rgba(0, 0, 0, 0.1);
		border: none;
		border-radius: 4px;
		padding: 4px;
		color: white;
		font-family: 'Open Sans', sans-serif;
	}
</style>
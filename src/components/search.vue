<template>
	<form @submit.prevent="sendQuery">
		<input id="search" v-model="query" type="text">		
	</form>
</template>

<script>
	export default {
		data () {
			return {
				query: ''
			}
		},
		methods: {
			sendQuery: function() {
				console.log(this.query);
			}
		}
	}
</script>

<style>
	form {
		margin: auto 0;
	}
	input {
		background: var(--search-background-day);
  	transition: background 1s;
		border: none;
		border-radius: 4px;
		padding: 4px;
		color: white;
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
	}
</style>

<!--
	For city search:
	api.openweathermap.org/data/2.5/weather?q={city name}&APPID={APIKEY}
	For GPS search:
	api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={APIKEY}
-->
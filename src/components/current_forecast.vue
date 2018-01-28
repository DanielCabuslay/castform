<template>
	<div class="current_forecast">
		<div id="city">{{ city }}</div>
		<div id="temp">
			<div id="high_and_low">
				<span>High: {{ high }}&deg;C</span> - <span>Low: {{ low }}&deg;C</span>
			</div>
			<div id="current_temp">
				{{ temp }}<sup>&deg;C</sup>
			</div>
			<div id="weather_description">
				{{ description }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['city', 'temp', 'high', 'low', 'description'],
		data () {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>
	#city, #current_temp {
	  font-family: 'Montserrat', sans-serif;
	  font-weight: 600;
	  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
	  color: white;
	}
	#city {
		font-size: 2rem;
	}
	#high_and_low {
		margin-top: 1rem;
	}
	#current_temp {
		font-size: 10rem;
		margin: -0.5rem 0;
	}
	#current_temp sup {
		font-size: 5rem;
		font-weight: 400;
	}
	#weather_description {
		font-size: 1.5rem;
		text-transform: capitalize;
	}
</style>

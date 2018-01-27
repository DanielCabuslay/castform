<template>
	<div class="current_forecast">
		<div id="city">{{ city }}</div>
		<div id="temp">
			<div id="high_and_low">
				<span>High: {{ high }}</span>
				<span>Low: {{ low }}</span>
			</div>
			<div id="current_temp">{{ temp }}<sup>&deg;C</sup></div>
		</div>
		<div id="weather">
			<div id="weather_icon"></div>
			<div id="weather_description">{{ description }}</div>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				city: '',
				temp: '',
				high: '',
				low: '',
				description: ''
			}
		},
		created: function() {
			if (navigator.geolocation) {
		    navigator.geolocation.getCurrentPosition(this.fetchGPSWeather);
		  }			
		},
		methods: {
			fetchGPSWeather: function(position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				var units = 'metric';
				var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
					lat + '&lon=' + lon + '&units=' + units + 
					'&APPID=2a6756e781c723daf2ae3f1e9a8fb98b';
				var request = new Request(apiUrl);
				fetch(request).then(response => {
					if (response.status === 200) {
						return response.json();
			    } else {
			      throw new Error('Something went wrong on api server!');
			    }
				})
				.then(response => {
					this.displayWeather(response);
				});
			},
			displayWeather: function(response) {
				this.city = response['name'];
				this.temp = Math.trunc(response['main']['temp']);
				this.high = response['main']['temp_max'];
				this.low = response['main']['temp_min'];
				this.description = response['weather'][0]['description'];
			}
		}
	}
</script>

<style>
	.current_forecast {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
	}
	#city, #current_temp {
	  font-family: 'Montserrat', sans-serif;
	  font-weight: 600;
	  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
	  color: white;
	}
	#city {
		grid-column: 1 / -1;
		font-size: 2rem;
	}
	#temp {		
		display: grid;
		grid-template-rows: 1fr 4fr;
	}
	#current_temp {
		font-size: 10rem;
		margin: 0;
	}
	#current_temp sup {
		font-size: 5rem;
		font-weight: 400;
	}
	#weather {
		display: grid;
		grid-template-rows: 4fr 1fr;
	}
	#weather_description {
		font-size: 1.5rem;
		text-transform: capitalize;
		text-align: center;
		display: flex;
		margin: auto;
	}
</style>

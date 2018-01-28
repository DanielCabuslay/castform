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
		<!-- <div id="weather"></div> -->
	</div>
</template>

<script>
	export default {
		props: ['query'],
		data () {
			return {
				city: 'Fetching location...',
				temp: '--',
				high: '',
				low: '',
				description: '',
				img: '',
				apiKey: '2a6756e781c723daf2ae3f1e9a8fb98b'
			}
		},
		created: function() {
			this.promptGPS();
		},
		methods: {
			promptGPS: function() {
				if (navigator.geolocation) {
			    navigator.geolocation.getCurrentPosition(this.prepareGPSApiCall);
			  }
			},
			prepareGPSApiCall: function(position) {
				var lat = position.coords.latitude;
				var lon = position.coords.longitude;
				var units = 'metric';
				var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
					lat + '&lon=' + lon + '&units=' + units + '&APPID=' + this.apiKey;
				this.fetchWeather(apiUrl);
			},
			prepareQueryApiCall: function(query) {
				var q = this.query;
				var units = 'metric';
				var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
				this.query + '&units=' + units + '&APPID=' + this.apiKey;
				this.fetchWeather(apiUrl);				
			},
			fetchWeather: function(apiUrl) {
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
					this.changeBackground(response);
				});	
			},
			displayWeather: function(response) {
				this.city = response['name'] + ', ' + response['sys']['country'];
				this.temp = Math.trunc(response['main']['temp']);
				this.high = response['main']['temp_max'];
				this.low = response['main']['temp_min'];
				this.description = response['weather'][0]['description'];
			},
			changeBackground: function(response) {
				var icon = response['weather'][0]['icon'].split('.')[0];
				if (icon.charAt(icon.length - 1) == 'n') {
					document.getElementById('search').style.background = 'var(--search-background-night)';
				}
				//day
				if (icon == '01d') {
					document.body.style.backgroundColor = 'var(--weather-clear-day)';
				} else if (icon == '02d') {
					document.body.style.backgroundColor = 'var(--weather-mixed-day)';
				} else if (icon == '03d' || icon == '04d') {
					document.body.style.backgroundColor = 'var(--weather-overcast-day)';
				} else if (icon == '09d' || icon == '10d') {
					document.body.style.backgroundColor = 'var(--weather-rain-day)';
				} else if (icon == '22d') {
					document.body.style.backgroundColor = 'var(--weather-thunderstorm-day)';
				} else if (icon == '13d' || icon == '50d') {
					document.body.style.backgroundColor = 'var(--weather-snow-day)';
				} 
				//night
				else if (icon == '01n') {
					document.body.style.backgroundColor = 'var(--weather-clear-night)';
				} else if (icon == '02n') {
					document.body.style.backgroundColor = 'var(--weather-clear-night)';
				} else if (icon == '03n' || icon == '04n') {
					document.body.style.backgroundColor = 'var(--weather-overcast-night)';
				} else if (icon == '09n' || icon == '10n') {
					document.body.style.backgroundColor = 'var(--weather-overcast-night)';
				} else if (icon == '22n') {
					document.body.style.backgroundColor = 'var(--weather-overcast-night)';
				} else if (icon == '13n' || icon == '50n') {
					document.body.style.backgroundColor = 'var(--weather-overcast-night)';
				}
			}
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
/*	#weather {
		display: grid;
		grid-template-rows: 4fr 1fr;
	}*/
	#weather_description {
		font-size: 1.5rem;
		text-transform: capitalize;
	}
	/*weather shapes*/
</style>

<template>
  <div id="main_app">
    <error-dialog :message="errorMessage"></error-dialog>
    <current-forecast :city="city" :temp="temp" :high="high" :low="low" :description="description"></current-forecast>
  </div>
</template>

<script>
	import Current from './current_forecast.vue';
  import Dialog from './dialog.vue';

	export default {
		props: ['query'],
		data() {
			return {
        city: 'Fetching location...',
        temp: '--',
        high: '--',
        low: '--',
        description: 'Fetching weather...',
        errorMessage: '',
        apiKey: '2a6756e781c723daf2ae3f1e9a8fb98b'
			}
		},
		components: {
    	'current-forecast': Current,
    	'error-dialog': Dialog
		},
		watch: {
			query: function() {
				this.prepareQueryApiCall(this.query);
			}
		},
		created: function() {
			this.promptGPS();
		},
  	methods: {
  		resetData: function(query) {
  		},
      promptGPS: function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.prepareGPSApiCall, this.prepareQueryApiCall('Toronto'));
        } else {
        	this.prepareQueryApiCall('Toronto');
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
        var units = 'metric';
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        query + '&units=' + units + '&APPID=' + this.apiKey;
        this.fetchWeather(apiUrl);
      },
      fetchWeather: function(apiUrl) {
        var request = new Request(apiUrl);
        fetch(request).then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
          	this.errorMessage = 'Unable to find ' + this.query;
						document.getElementById('error_dialog').style.visibility = 'visible';
						document.getElementById('error_dialog').style.opacity = '1';
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
	#main_app {
		margin: 4rem 2rem 0;
		text-align: center;
	}
</style>
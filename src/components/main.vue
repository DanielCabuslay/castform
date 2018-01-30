<template>
  <div id="main_app">
    <toast id="toast" class="toast" :message="toastMessage"></toast>
    <current-forecast :city="city" :temp="temp" :high="high" :low="low" :description="description" :units="units"></current-forecast>
  </div>
</template>

<script>
	import Current from './current_forecast.vue';
  import Toast from './toast.vue';

	export default {
		props: ['query', 'lat', 'lon', 'update'],
		data() {
			return {
        city: 'Fetching location...',
        temp: '--',
        units: '',
        high: '--',
        low: '--',
        description: 'Fetching weather...',
        toastMessage: '',
        apiKey: '2a6756e781c723daf2ae3f1e9a8fb98b'
			}
		},
		created: function() {
			this.isFahrenheit();
		},
		components: {
    	'current-forecast': Current,
    	'toast': Toast
		},
		watch: {
			query: function() {
				this.prepareQueryApiCall(this.query);
			},
			update: function() {
				this.prepareGPSApiCall(this.lat, this.lon);
			},
			fahrenheit: function() {
				this.isFahrenheit();
			}
		},
  	methods: {
  		isFahrenheit: function() {
  			var isFahrenheit = localStorage.getItem('castform-fahrenheit') == 'true';
				if (isFahrenheit) {
					this.units = 'F';
				} else {
					this.units = 'C';
				}
				return isFahrenheit;
  		},
  		convertToFahrenheit: function(temp) {
				return Math.trunc(temp * 9 / 5) + 32;
  		},
      prepareGPSApiCall: function(lat, lon) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' +
          lat + '&lon=' + lon + '&units=metric&APPID=' + this.apiKey;
        this.fetchWeather(apiUrl);
      },
      prepareQueryApiCall: function(query) {
        var apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' +
        query + '&units=metric&APPID=' + this.apiKey;
        this.fetchWeather(apiUrl);
      },
      fetchWeather: function(apiUrl) {
        var request = new Request(apiUrl);
        fetch(request).then(response => {
          if (response.status === 200) {
            return response.json();
          } else {
          	this.toastMessage = 'Unable to find ' + this.query;
		      	var toast = document.getElementById('toast');
						toast.classList.add('toast_slide');
						setTimeout(function() {
		      		toast.classList.remove('toast_slide');
						}, 3000)
        		document.getElementById('loading_spinner').style.opacity = 0;
            throw new Error('Status returned by server: ' + response.status);
          }
        })
        .then(response => {
          this.displayWeather(response);
          this.changeBackground(response);
        	document.getElementById('loading_spinner').style.opacity = 0;
        }); 
      },
			displayWeather: function(response) {
				var temp = Math.trunc(response['main']['temp']);
				var high = Math.trunc(response['main']['temp_max']);
				var low = Math.trunc(response['main']['temp_min']);
				if (this.isFahrenheit()) {
					temp = this.convertToFahrenheit(temp);
					high = this.convertToFahrenheit(high);
					low = this.convertToFahrenheit(low);
				}
				this.temp = temp;
				this.high = high;
				this.low = low;
				this.description = response['weather'][0]['description'];
				this.city = response['name'] + ', ' + response['sys']['country'];
        localStorage.setItem('castform-last-lon', response['coord']['lon']);
        localStorage.setItem('castform-last-lat', response['coord']['lat']);
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
	.toast {
		visibility: hidden;
		opacity: 0;
		bottom: 2rem;
		right: 2rem;
	}
	.toast_slide {
		animation-name: toast_slide;
		animation-duration: 3s; 
	}
	@keyframes toast_slide {
		0% {visibility: hidden; opacity: 0; bottom: 0rem;}
		20% {visibility: visible; opacity: 1; bottom: 2rem;}
		90% {visibility: visible; opacity: 1; bottom: 2rem;}
		100% {visibility: hidden; opacity: 0; bottom: 0rem;}
	}
</style>
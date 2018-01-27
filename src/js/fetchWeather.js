const apiKey = '2a6756e781c723daf2ae3f1e9a8fb98b';

function fetchGPSWeather(position) {
	var lat = position.coords.latitude;
	var lon = position.coords.longitude;
	var apiUrl = 'api.openweathermap.org/data/2.5/weather?lat=' +
		lat + '&lon=' + lon + '&APPID=' + apiKey;
	var request = new Request(apiUrl);
	fetch()
}

// For city search:
// api.openweathermap.org/data/2.5/weather?q={city name}&APPID={APIKEY}
// For GPS search:
// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&APPID={APIKEY}
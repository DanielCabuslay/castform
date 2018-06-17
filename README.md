# OpenWeatherMap Web App: Castform
Castform is a Vue.js app that get's the user's weather at any given location. The user can get weather at their current location using their browser's location service if permission is granted. Weather data is pulled from OpenWeatherMap

## How to Use
The browser will prompt for the user's location. If permission is granted, weather at the user's location will be fetched. Otherwise, weather from Toronto will load by default. The user can search for weather at any city using the search bar. The user can switch between Celsuis and Fahrenheit in the settings.

## Acknowledgments
* [OpenWeatherMap](https://openweathermap.org/)

## Changelog
* v1.0.0 (June 17, 2018)
	* Initial release

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

![Image of Castform](https://cdn.bulbagarden.net/upload/f/f3/351Castform.png)

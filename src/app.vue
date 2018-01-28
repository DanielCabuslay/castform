<template>
  <main>
    <app-dialog id="location_dialog"></app-dialog>
    <app-header></app-header>
    <main-app></main-app>
    <div id="watermark_text">
      Weather provided by <a target="_blank" ref="noopener noreferrer" href="https://openweathermap.org/">OpenWeatherMap</a>
    </div>
  </main>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style>
:root {
  --weather-clear-day: deepskyblue;
  --weather-mixed-day: skyblue;
  --weather-overcast-day: #bbb;
  --weather-rain-day: #999;
  --weather-thunderstorm-day: grey;
  --weather-snow-day: #ccc;
  --weather-clear-night: #001f3a;
  --weather-overcast-night: #1e1e1e;
  --search-background-day: rgba(0, 0, 0, 0.1);
  --search-background-night: rgba(255, 255, 255, 0.1);
}
body {
  margin: 0;
  background-color: #eee;
  transition: background-color 1s;
  color: rgba(255, 255, 255, 0.9);
}
main {
  font-family: 'Open Sans', sans-serif;
  position: relative;
}
h1, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
}
#location_dialog {
  opacity: 0;
  visibility: hidden;
}
#watermark_text {
  position: fixed;
  bottom: 0.5rem;
  right: 1rem;
  color: rgba(255, 255, 255, 0.33);
  font-size: 0.75rem;
}
#watermark_text a {
  text-decoration: none;
  color: inherit;
}
</style>

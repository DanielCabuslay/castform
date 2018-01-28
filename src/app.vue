<template>
  <main>
    <app-header></app-header>
    <main-app></main-app>
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
}
h1, h2 {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  color: white;
}
</style>

<template>
  <main id="app">
    <Header/>
    <Weather/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from './components/Header.vue'
import Weather from './components/Weather.vue'

@Component({
  components: {
    Header,
    Weather
  }
})
export default class App extends Vue {
  created () {
    this.getCurrentWeather()
  }

  async getCurrentWeather () {
    await this.$store.dispatch('updateCurrentWeather', 'Toronto')
  }
}
</script>

<style lang="scss">
@import 'styles/variables.scss';

@font-face {
  font-family: 'DM Sans';
  font-weight: 400;
  font-display: swap;
  src: url('assets/fonts/DMSans-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'DM Sans';
  font-weight: 500;
  font-display: swap;
  src: url('assets/fonts/DMSans-Medium.ttf') format('truetype');
}
@font-face {
  font-family: 'DM Sans';
  font-weight: 700;
  font-display: swap;
  src: url('assets/fonts/DMSans-Bold.ttf') format('truetype');
}
html {
  background: $skygradient;
  background-repeat: no-repeat;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, input, button {
  font-family: $fontfamily;
}
button {
  cursor: pointer;
}
body {
  margin: 0;
}
input {
  font-size: 1em;
  padding: 0.5rem;
}
.container {
  width: 1024px;
  margin: auto;
}
</style>

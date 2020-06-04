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
  font-family: 'Quicksand';
  font-weight: 300;
  font-display: swap;
  src: url('assets/fonts/Quicksand-Light.ttf') format('truetype');
}
@font-face {
  font-family: 'Quicksand';
  font-weight: 400;
  font-display: swap;
  src: url('assets/fonts/Quicksand-Regular.ttf') format('truetype');
}
@font-face {
  font-family: 'Quicksand';
  font-weight: 500;
  font-display: swap;
  src: url('assets/fonts/Quicksand-Medium.ttf') format('truetype');
}
html {
  background: $skygradient;
  background-repeat: no-repeat;
  background-position: top;
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
  font-weight: 500;
  background: transparent;
  border: none;
  border-bottom: 1px solid $blacktranslucent;
  &:focus {
    border-bottom: 1px solid black;
  }
}
::placeholder {
  color: $blacktranslucent;
}
.container {
  width: 1024px;
  margin: auto;
}
@media (max-width: 1024px) {
  .container {
    width: calc(100vw - 1rem);
    margin: 0 0.5rem;
  }
}
</style>

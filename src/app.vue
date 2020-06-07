<template>
  <main id="app" :class="currentWeather">
    <div id="background"></div>
    <Settings/>
    <Header/>
    <Weather/>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Header from './components/Header.vue'
import Weather from './components/Weather.vue'
import Settings from './components/Settings.vue'

@Component({
  components: {
    Header,
    Weather,
    Settings
  }
})
export default class App extends Vue {
  created () {
    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 27 && this.$store.getters.showSettings) {
        this.$store.commit('changeSettingsState', false)
      }
    })
  }

  get currentWeather () {
    if (this.$store.getters.locationAccess) {
      return this.$store.getters.isDaytime && this.$store.getters.locationAccess ? 'clear' : 'nighttime'
    }
    return ''
  }
}
</script>

<style lang="scss">
@import '@/styles/variables';

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
@font-face {
  font-family: 'Quicksand';
  font-weight: 600;
  font-display: swap;
  src: url('assets/fonts/Quicksand-SemiBold.ttf') format('truetype');
}
#app {
}
h1 {
  font-weight: 600;
}
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $tan;
  color: $brown;
}
html, input, button, select {
  font-family: $fontfamily;
}
button {
  cursor: pointer;
  font-size: 1.25em;
  font-weight: 500;
  border: 1px solid $brown;
  color: $brown;
  border-radius: 0.25rem;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0.75rem;
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
#background {
  height: 100vh;
  width: 100vw;
  background-repeat: no-repeat;
  background-position: top;
  position: fixed;
  z-index: -1;
  left: 0;
}
.clear {
  *:not(path) {
    color: $black;
    fill: $black;
  }
  #background {
    background: $skygradient;
  }
  button {
    border-color: $black;
  }
}
.nighttime {
  *:not(path) {
    color: $white;
    fill: $white;
  }
  #background {
    background: $nightgradient;
  }
  button {
    border-color: $white;
  }
}
@media (max-width: 1024px) {
  .container {
    width: calc(100vw - 1rem);
    margin: 0 0.5rem;
  }
}
</style>

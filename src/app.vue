<template>
  <main id="app">
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
  defaultCityId = null

  beforeCreate () {
    if (!localStorage.getItem('defaultCityId')) {
      this.$store.dispatch('updateDefaultCityId', '6167865').then(() => {
        this.defaultCityId = this.$store.getters.defaultCityId
        this.$store.dispatch('updateCurrentWeatherById', this.defaultCityId)
      })
    } else {
      if (this.$store.getters.defaultCityId) {
        this.defaultCityId = this.$store.getters.defaultCityId
        this.$store.dispatch('updateCurrentWeatherById', this.defaultCityId)
      }
    }
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
h1 {
  font-weight: 600;
}
html {
  background: $skygradient;
  background-repeat: no-repeat;
  background-position: top;
  height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
html, input, button, select {
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

<template>
  <div class="container">
    <div v-if="locationAccess">
      <CurrentWeather/>
      <HourlyForecast/>
    </div>
    <div class="prompt" v-else>
      <h1>Location Access Required</h1>
      <p>This app uses your current location to fetch the weather. You'll need to allow location access to this app to use it.</p>
      <button @click="promptLocationAccess">Allow Location Access</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CurrentWeather from './CurrentWeather.vue'
import HourlyForecast from './HourlyForecast.vue'

@Component({
  components: {
    CurrentWeather,
    HourlyForecast
  }
})
export default class Weather extends Vue {
  mounted () {
    if (this.locationAccess) {
      this.promptLocationAccess()
    }
  }

  promptLocationAccess () {
    navigator.geolocation.getCurrentPosition(this.getWeatherData, () => {
      localStorage.removeItem('locationAccess')
      this.$store.commit('updateLocationAccess')
    })
  }

  getWeatherData (position: any) {
    this.$store.dispatch('updateLocationAccess').then(() => {
      const lat = position.coords.latitude
      const lon = position.coords.longitude
      this.$store.dispatch('getCurrentLocationWeatherOneCall', { lat, lon }).then(() => {
        // this.disabled = false
      }, () => {
        // this.disabled = false
      })
    })
  }

  get locationAccess () {
    if (this.$store.getters.locationAccess) {
      return this.$store.getters.locationAccess !== null
    }
    return false
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 4rem;
}
.prompt {
  margin: auto;
  text-align: center;
  button {
    margin: auto;
  }
}
@media (max-width: 768px) {
  .container {
    margin: 3rem 0 0;
    width: 100vw;
  }
}
@media (max-width: 425px) {
  .container {
    margin-top: 2rem;
  }
}
</style>

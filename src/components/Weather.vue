<template>
  <div class="container">
    <CurrentWeather></CurrentWeather>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import CurrentWeather from './CurrentWeather.vue'
import WIDayCloudyGusts from '@/components/weather-icons/WIDayCloudyGusts.vue'

@Component({
  components: {
    CurrentWeather,
    WIDayCloudyGusts
  }
})
export default class Weather extends Vue {
  get city () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.name
    }
  }

  get country () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.sys.country
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin-top: 4rem;
}
</style>

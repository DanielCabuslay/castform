<template>
  <div class="current-forecast">
    <section>
      <div class="icon">
        <WIDayCloudyGusts></WIDayCloudyGusts>
      </div>
      <div class="current-temp">
        {{ currentTemp }}&deg;C
      </div>
      <div class="current-high-low">
        <div>{{ currentHigh }}&deg;C</div>
        <div>{{ currentLow }}&deg;C</div>
      </div>
      <div class="current-other">
        <div>Feels like {{ feelsLike }}&deg;C</div>
        <div>{{ windSpeed }} km/h WNW</div>
      </div>
    </section>
    <div class="current-description">
      {{ description }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import WIDayCloudyGusts from '@/components/weather-icons/WIDayCloudyGusts.vue'

@Component({
  components: {
    WIDayCloudyGusts
  }
})
export default class CurrentWeather extends Vue {
  get currentTemp () {
    if (this.$store.getters.currentWeather) {
      return Math.trunc(this.$store.getters.currentWeather.main.temp)
    }
  }

  get currentHigh () {
    if (this.$store.getters.currentWeather) {
      return Math.trunc(this.$store.getters.currentWeather.main.temp_max)
    }
  }

  get currentLow () {
    if (this.$store.getters.currentWeather) {
      return Math.trunc(this.$store.getters.currentWeather.main.temp_min)
    }
  }

  get feelsLike () {
    if (this.$store.getters.currentWeather) {
      return Math.trunc(this.$store.getters.currentWeather.main.feels_like)
    }
  }

  get windSpeed () {
    if (this.$store.getters.currentWeather) {
      return Math.trunc(this.$store.getters.currentWeather.wind.speed)
    }
  }

  get description () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.weather[0].main
    }
  }
}
</script>

<style scoped lang="scss">
.city, .current-description {
  font-size: 2em;
}
section {
    display: flex;
    align-items: center;
    .current-temp {
        font-size: 11em;
        margin-left: 2rem;
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    .current-high-low {
        font-size: 2em;
        margin-left: 4rem;
        div:first-child {
          border-bottom: 1px solid black;
          padding-bottom: 0.5rem;
        }
        div:last-child {
          border-top: 1px solid black;
          padding-top: 0.5rem;
        }
    }
    .current-other {
        margin-left: 4rem;
        div:not(:last-child) {
          margin-bottom: 0.25rem;
        }
    }
}
</style>

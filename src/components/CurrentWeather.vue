<template>
  <div class="current-forecast">
    <section>
      <div class="city">
        {{ city }}
      </div>
      <div class="description">
        {{ description }}
      </div>
    </section>
    <section>
      <div class="icon">
        <WIDayCloudyGusts></WIDayCloudyGusts>
      </div>
      <div class="temp">
        {{ currentTemp }}&deg;C
      </div>
    </section>
    <section>
      <div class="high-low">
        <div>{{ currentHigh }}&deg;C</div>
        <div>{{ currentLow }}&deg;C</div>
      </div>
      <div class="feels-like">Feels like {{ feelsLike }}&deg;C</div>
      <div class="wind">{{ windSpeed }} km/h {{ windDirection }}</div>
    </section>
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
      return this.$store.getters.currentWeather.wind.speed
    }
  }

  get city () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.name
    }
  }

  get description () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.weather[0].main
    }
  }

  get windDirection () {
    if (this.$store.getters.currentWeather) {
      const deg = this.$store.getters.currentWeather.wind.deg
      if (deg >= 11.25 && deg < 33.75) {
        return 'NNE'
      }
      if (deg >= 33.75 && deg < 56.25) {
        return 'NE'
      }
      if (deg >= 56.25 && deg < 78.75) {
        return 'ENE'
      }
      if (deg >= 78.75 && deg < 101.25) {
        return 'E'
      }
      if (deg >= 101.25 && deg < 123.75) {
        return 'ESE'
      }
      if (deg >= 123.75 && deg < 146.25) {
        return 'SE'
      }
      if (deg >= 146.25 && deg < 168.75) {
        return 'SSE'
      }
      if (deg >= 168.75 && deg < 191.25) {
        return 'S'
      }
      if (deg >= 191.25 && deg < 213.75) {
        return 'SSW'
      }
      if (deg >= 213.75 && deg < 236.25) {
        return 'SW'
      }
      if (deg >= 236.25 && deg < 258.75) {
        return 'WSW'
      }
      if (deg >= 258.75 && deg < 281.25) {
        return 'W'
      }
      if (deg >= 281.25 && deg < 303.75) {
        return 'WNW'
      }
      if (deg >= 303.75 && deg < 326.25) {
        return 'NW'
      }
      if (deg >= 326.25 && deg < 348.75) {
        return 'NNW'
      }
      return 'N'
    }
  }
}
</script>

<style scoped lang="scss">
section {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
}
section:first-child {
  text-align: center;
  flex-direction: column;
}
section:nth-child(2) {
  margin-top: 0.5rem;
}
section:last-child {
  margin-top: 1rem;
}
.city {
  font-size: 2em;
}
.description {
  font-size: 1.5em;
  margin-top: 0.5rem;
}
.temp {
  font-size: 11em;
  margin-left: 2rem;
  text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
}
.high-low {
  font-size: 1.5em;
  margin-right: 2rem;
  div:first-child {
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;
  }
  div:last-child {
    border-top: 1px solid black;
    padding-top: 0.5rem;
  }
}
.wind {
  margin-left: 2rem;
}
</style>

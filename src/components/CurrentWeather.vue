<template>
  <div id="current-forecast">
    <section>
      <div class="date">
        {{ date }}
      </div>
      <div class="city">
        {{ city }}
      </div>
      <div class="description">
        {{ description }}
      </div>
    </section>
    <section>
      <WeatherIconViewer class="icon" v-bind:id="weatherId"/>
      <div class="temp">
        {{ currentTemp }}&deg;{{ temperatureUnits }}
      </div>
      <div class="high-low">
        <div>
          <ArrowNarrowUp/>{{ currentHigh }}&deg;{{ temperatureUnits }}
        </div>
        <div>
          <ArrowNarrowDown/>{{ currentLow }}&deg;{{ temperatureUnits }}
        </div>
      </div>
    </section>
    <section>
      <div class="feels-like">Feels like {{ feelsLike }}&deg;{{ temperatureUnits }}</div>
      <div class="wind">{{ windSpeed }} {{ speedUnits }} {{ windDirection }}</div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { ArrowNarrowUp, ArrowNarrowDown } from './heroicons'
import WeatherIconViewer from './WeatherIconViewer.vue'

@Component({
  components: {
    ArrowNarrowUp,
    ArrowNarrowDown,
    WeatherIconViewer
  }
})
export default class CurrentWeather extends Vue {
  get currentTemp () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.trunc((this.$store.getters.currentWeather.main.temp * 1.8) + 32)
      }
      return Math.trunc(this.$store.getters.currentWeather.main.temp)
    }
  }

  get currentHigh () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.trunc((this.$store.getters.currentWeather.main.temp_max * 1.8) + 32)
      }
      return Math.trunc(this.$store.getters.currentWeather.main.temp_max)
    }
  }

  get currentLow () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.trunc((this.$store.getters.currentWeather.main.temp_min * 1.8) + 32)
      }
      return Math.trunc(this.$store.getters.currentWeather.main.temp_min)
    }
  }

  get feelsLike () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.trunc((this.$store.getters.currentWeather.main.feels_like * 1.8) + 32)
      }
      return Math.trunc(this.$store.getters.currentWeather.main.feels_like)
    }
  }

  get windSpeed () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.round(this.$store.getters.currentWeather.wind.speed / 1.609344)
      }
      return Math.round(this.$store.getters.currentWeather.wind.speed)
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

  get date () {
    if (this.$store.getters.currentWeather) {
      return new Date((this.$store.getters.currentWeather.dt + this.$store.getters.currentWeather.timezone) * 1000).toLocaleDateString('en-CA', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      })
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

  get weatherId () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.weather[0].id
    }
    return 0
  }

  get temperatureUnits () {
    if (this.$store.getters.units) {
      return this.$store.getters.units === 'imperial' ? 'F' : 'C'
    }
  }

  get speedUnits () {
    if (this.$store.getters.units) {
      return this.$store.getters.units === 'imperial' ? 'mph' : 'km/h'
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';

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
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(3, auto);
  margin-top: 0.5rem;
}
section:last-child {
  margin-top: 1rem;
  div {
    margin: 0 1rem;
  }
}
.date {
  font-weight: 600;
}
.city, .description {
  margin-top: 0.5rem;
  font-weight: 500;
}
.city {
  font-size: 2em;
}
.description {
  font-size: 1.5em;
}
.temp {
  font-size: 11em;
  text-shadow: $shadow;
}
.high-low {
  font-size: 1.25em;
  svg {
    height: 1em;
  }
  div {
    display: flex;
    align-items: center;
  }
  div:first-child {
    margin-bottom: 0.5rem;
  }
  div:last-child {
    margin-top: 0.5rem;
  }
}
@media (max-width: 768px) {
  section:nth-child(2) {
    grid-template-columns: auto auto;
    grid-template-rows: 1fr;
    grid-gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .temp {
    font-size: 7em;
  }
  .high-low {
    grid-column: 1 / -1;
    margin: auto;
    display: flex;
    div {
      margin: 0 0.5rem;
    }
    div:first-child {
      border-bottom: none;
      margin-bottom: 0rem;
    }
    div:last-child {
      border-top: none;
      margin-top: 0rem;
    }
  }
}
@media (max-width: 425px) {
  .city {
    font-size: 1.5em;
  }
  .description {
    font-size: 1.25em;
  }
  .temp {
    font-size: 5em;
  }
  .high-low {
    font-size: 1em;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
#current-forecast .icon {
  svg {
    height: 11em;
    filter: drop-shadow($shadow);
  }
}
@media (max-width: 768px) {
  #current-forecast .icon {
    svg {
      height: 7em;
    }
  }
}
@media (max-width: 425px) {
  #current-forecast .icon {
    svg {
      height: 5em;
    }
  }
}
</style>

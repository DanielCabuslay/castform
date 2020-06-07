<template>
  <div id="hourly-forecast">
    <div v-for="hour of hourlyForecast" :key="hour.dt">
      <div class="time">{{ getTime(hour.dt) }}</div>
      <WeatherIconViewer class="icon" :id="hour.weather[0].id"/>
      <div class="temp">{{ getTemp(hour.temp) }}&deg;{{ temperatureUnits }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import WeatherIconViewer from './WeatherIconViewer.vue'

@Component({
  components: {
    WeatherIconViewer
  }
})
export default class HourlyForecast extends Vue {
  get hourlyForecast () {
    if (this.$store.getters.hourlyForecast) {
      return this.$store.getters.hourlyForecast
    }
  }

  getTime (dt: number) {
    const showAmPm = this.$store.getters.showAmPm === '12h'
    const timeOptions = {
      hour12: showAmPm
    }
    const timeStr = new Date(dt * 1000).toLocaleTimeString('en-CA', timeOptions)
    if (showAmPm) {
      return timeStr.split(':')[0] + ' ' + timeStr.split(' ')[1]
    }
    return timeStr.split(':')[0] + ':' + timeStr.split(':')[1]
  }

  getTemp (temp: number) {
    if (this.$store.getters.units === 'imperial') {
      return Math.round((temp * 1.8) + 32)
    }
    return Math.round(temp)
  }

  get feelsLike () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.round((this.$store.getters.currentWeather.feels_like * 1.8) + 32)
      }
      return Math.round(this.$store.getters.currentWeather.feels_like)
    }
  }

  get windSpeed () {
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.units === 'imperial') {
        return Math.round(this.$store.getters.currentWeather.wind_speed / 1.609344)
      }
      return Math.round(this.$store.getters.currentWeather.wind_speed)
    }
  }

  get description () {
    if (this.$store.getters.currentWeather) {
      return this.$store.getters.currentWeather.weather[0].description
    }
  }

  get windDirection () {
    if (this.$store.getters.currentWeather) {
      const deg = this.$store.getters.currentWeather.wind_deg
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

#hourly-forecast {
  display: flex;
  overflow-x: scroll;
  margin-top: 3rem;
  // scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
  scrollbar-width: none;
  background-color: $darkbluefaded;
  padding: 1rem 0rem;
  border-radius: 30px;
  & > div {
    padding: 0.5rem 1.5rem;
    text-align: center;
    .time, .temp {
      font-weight: 500;
    }
    .time {
      margin-bottom: 0.5rem;
    }
    .temp {
      font-size: 1.1em;
    }
  }
  &::-webkit-scrollbar {
    // height: 40px;
    // width: 0px;
    // display: none;
  }
}
@media (max-width: 768px) {
  #hourly-forecast {
    & > div {
      padding: 0 0.75rem;
    }
  }
  .icon, .temp {
    margin: 0 0.5rem;
  }
}
@media (max-width: 425px) {
  #hourly-forecast {
    margin-top: 2rem;
    & > div {
      padding: 0 0.25rem;
    }
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
#hourly-forecast .icon {
  svg {
    height: 4em;
    filter: drop-shadow($shadow);
  }
}
@media (max-width: 768px) {
  #hourly-forecast .icon {
    svg {
      height: 3em;
    }
  }
}
</style>

<template>
  <div id="daily-forecast">
    <div v-for="day of dailyForecast" :key="day.dt">
      <div>
        <div>
          <div class="day">{{ getDate(day.dt) }}</div>
          <div class="description">{{ day.weather[0].description }}</div>
        </div>
        <div class="temp">
          <WeatherIconViewer class="icon" :id="day.weather[0].id"/>
          <div class="num">
            <div class="temp_high">{{ getTemp(day.temp.max) }}&deg;{{ temperatureUnits }}</div>
            <div class="temp_low">{{ getTemp(day.temp.min) }}&deg;{{ temperatureUnits }}</div>
          </div>
        </div>
      </div>
      <!-- <div>
        second row
      </div> -->
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
export default class DailyForecast extends Vue {
  get dailyForecast () {
    if (this.$store.getters.dailyForecast) {
      return this.$store.getters.dailyForecast
    }
  }

  getDate (dt: number) {
    const dateOptions = {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }
    return new Date(dt * 1000).toLocaleDateString('en-CA', dateOptions)
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

#daily-forecast {
//   display: flex;
//   overflow-x: scroll;
  max-width: 450px;
  margin: 1rem auto 0;
  padding: 1rem 0rem;
  & > div {
    background-color: $darkbluefaded;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    .day, .temp_high, .temp_low {
      font-weight: 500;
    }
    .description {
      text-transform: capitalize;
    }
    & > div:first-child {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .temp {
        display: flex;
        align-items: center;
        & > div {
          margin-left: 0.5rem;
        }
        & > .num {
          text-align: right;
        }
      }
      .temp_high, .temp_low {
        font-size: 1.1em;
      }
    }
    // & > div:last-child {
    //   display: none;
    // }
  }
}
@media (max-width: 768px) {
  #daily-forecast {
    & > div {
      margin: 0.5rem 0;
    }
  }
  .icon, .temp {
    margin: 0 0.5rem;
  }
}
</style>

<style lang="scss">
@import '@/styles/variables';
#daily-forecast .icon {
  svg {
    height: 4em;
    filter: drop-shadow($shadow);
  }
}
@media (max-width: 768px) {
  #daily-forecast .icon {
    svg {
      height: 3em;
    }
  }
}
</style>

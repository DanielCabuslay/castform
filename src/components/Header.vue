<template>
  <header>
    <div class="container">
      <section>
        <!-- <div class="search-bar">
          <Search class="icon"></Search>
          <input @keyup.enter="search()" v-model="query" placeholder="Search for a city..." :disabled="disabled">
          <button class="current-location" @click="promptUserLocation" :disabled="disabled">
            <LocationMarker></LocationMarker>
          </button>
        </div> -->
        <div class="date">{{ date }}</div>
      </section>
      <section>
        <button @click="openSettings()">
          <Cog></Cog>
          <span>Settings</span>
        </button>
      </section>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import Cog from './heroicons/Cog.vue'
import LocationMarker from './heroicons/LocationMarker.vue'
import Search from './heroicons/Search.vue'

@Component({
  components: {
    Cog,
    LocationMarker,
    Search
  }
})
export default class Header extends Vue {
  query = ''
  disabled = false

  search () {
    this.disabled = true
    this.$store.dispatch('updateCurrentWeather', this.query).then(() => {
      this.disabled = false
    }, () => {
      this.disabled = false
    })
    // this.$store.dispatch('getHourlyForecast', this.query)
  }

  promptUserLocation () {
    this.disabled = true
    navigator.geolocation.getCurrentPosition(this.getCurrentLocationWeatherOneCall, () => {
      this.disabled = false
    })
  }

  getCurrentLocationWeather (position: any) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    this.$store.dispatch('getCurrentLocationWeather', { lat, lon }).then(() => {
      this.disabled = false
    }, () => {
      this.disabled = false
    })
  }

  getCurrentLocationWeatherOneCall (position: any) {
    const lat = position.coords.latitude
    const lon = position.coords.longitude
    this.$store.dispatch('getCurrentLocationWeatherOneCall', { lat, lon }).then(() => {
      this.disabled = false
    }, () => {
      this.disabled = false
    })
  }

  openSettings () {
    this.$store.commit('changeSettingsState', true)
  }

  get date () {
    const dateOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC'
    }
    if (this.$store.getters.currentWeather) {
      if (this.$store.getters.timezone) {
        dateOptions.timeZone = this.$store.getters.timezone
      }
      return new Date(this.$store.getters.currentWeather.dt * 1000).toLocaleDateString('en-CA', dateOptions)
    } else {
      return new Date(Date.now()).toLocaleDateString('en-CA', dateOptions)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables';

header {
  height: 64px;
  display: flex;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.date {
  font-size: 1.25em;
  font-weight: 500;
  margin: 0 0.75rem;
}
.search-bar {
  display: flex;
  align-items: center;
  .icon {
    padding: 6px;
    margin-right: -36px;
    height: 24px;
  }
  input {
    width: 250px;
    padding-left: 36px;
  }
}
section:last-child {
  display: flex;
  align-items: center;
  justify-content: end;
}
button {
  border: none;
  svg {
    height: 32px;
  }
  span {
    margin: 0 0.25rem;
  }
}
@media (max-width: 425px) {
  .search-bar {
    input {
      width: 150px;
    }
  }
  button {
    span {
      display: none;
    }
  }
}
</style>

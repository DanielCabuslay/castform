<template>
  <header>
    <div class="container">
      <section>
        <div class="search-bar">
          <img class="logo" src="@/assets/logo-black.png">
          <Search class="icon"></Search>
          <input @keyup.enter="search()" v-model="query" placeholder="Search for a city..." :disabled="disabled">
          <button class="current-location" @click="promptUserLocation" :disabled="disabled">
            <LocationMarker></LocationMarker>
          </button>
        </div>
      </section>
      <section>
        <div class="date">{{ currentDate }}</div>
        <Cog></Cog>
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
  currentDate = ''
  query = ''
  disabled = false

  created () {
    this.currentDate = new Date(Date.now()).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  search () {
    this.disabled = true
    this.$store.dispatch('updateCurrentWeather', this.query).then(() => {
      this.disabled = false
    }, () => {
      this.disabled = false
    })
  }

  promptUserLocation () {
    this.disabled = true
    navigator.geolocation.getCurrentPosition(this.getCurrentLocationWeather, () => {
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
}
</script>

<style lang="scss" scoped>
header {
  height: 64px;
  display: flex;
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.logo {
  height: 48px;
  margin-right: 1rem;
}
.search-bar {
  display: flex;
  align-items: center;
  .icon {
    border-bottom: 1px solid black;
    padding: 6px;
    margin-right: -36px;
  }
  input {
    background: transparent;
    border: none;
    border-bottom: 1px solid black;
    width: 300px;
    padding-left: 36px;
  }
  .current-location {
    background: transparent;
    border: 2px solid black;
    border-radius: 0.25rem;
    margin-left: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
  }
}
section:last-child {
  display: flex;
  align-items: center;
  justify-content: end;
  .date {
    font-size: 1.1em;
    margin-right: 2rem;
  }
}
</style>

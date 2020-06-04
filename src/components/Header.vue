<template>
  <header>
    <div class="container">
      <section>
        <div class="search-bar">
          <Search class="icon"></Search>
          <input @keyup.enter="search()" v-model="query" placeholder="Search for a city..." :disabled="disabled">
          <button class="current-location" @click="promptUserLocation" :disabled="disabled">
            <LocationMarker></LocationMarker>
          </button>
        </div>
      </section>
      <section>
        <button>
          <Cog></Cog>
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
  .date {
    font-size: 1.1em;
    margin-right: 2rem;
  }
}
button {
  background: transparent;
  border: none;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.25rem 0.5rem;
  svg {
    height: 32px;
  }
}
@media (max-width: 425px) {
  .search-bar {
    input {
      width: 150px;
    }
  }
}
</style>

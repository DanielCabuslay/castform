<template>
  <header>
    <div class="container">
      <section>
        <div class="search-bar">
          <img class="logo" src="@/assets/logo-black.png">
          <Search class="icon"></Search>
          <input placeholder="Search for a city...">
          <LocationMarker class="location-icon"></LocationMarker>
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
import { Component, Vue } from 'vue-property-decorator'
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

  created () {
    this.currentDate = new Date(Date.now()).toLocaleDateString('en-CA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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
  .location-icon {
    margin-left: 0.5rem;
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

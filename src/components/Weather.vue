<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div class="city">Toronto, ON</div>
    <div class="current-forecast">
      <div class="icon">
        <WIDayCloudyGusts></WIDayCloudyGusts>
      </div>
      <div class="current-temp">
        24&deg;C
      </div>
      <div class="current-high-low">
        25&deg;C / 17&deg;C
      </div>
      <div class="current-other">
        <div>Feels like 23&deg;C</div>
        <div>6 km/h WNW</div>
      </div>
    </div>
    <div class="current-description">
      Few Clouds
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import WIDayCloudyGusts from '@/components/weather-icons/WIDayCloudyGusts.vue'

@Component({
  components: {
    WIDayCloudyGusts
  }
})
export default class Weather extends Vue {
  @Prop() private msg!: string;
}
</script>

<style scoped lang="scss">
.city, .current-description {
  font-size: 2em;
}
.current-forecast {
    display: flex;
    align-items: center;
    .current-temp {
        font-size: 11em;
        margin-left: 1rem;
        text-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    }
    .current-high-low {
        font-size: 2em;
        margin-left: 3rem;
    }
    .current-other {
        margin-left: 3rem;
    }
}
</style>

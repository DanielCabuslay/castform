<template>
  <div>
    <WIDayCloudyGusts
      v-if="weatherId === 801 ||
      weatherId === 802 ||
      weatherId === 803"/>
    <WIDayFog v-if="weatherId === 741"/>
    <WIDayHail v-if="weatherId === 906"/>
    <WIDayHaze v-if="weatherId === 721"/>
    <WIDayLightning
      v-if="weatherId === 210 ||
        weatherId === 211 ||
        weatherId === 212 ||
        weatherId === 221"/>
    <WIDayRain
      v-if="weatherId === 302 ||
        weatherId === 310 ||
        weatherId === 311 ||
        weatherId === 312 ||
        weatherId === 313 ||
        weatherId === 314 ||
        weatherId === 501 ||
        weatherId === 502 ||
        weatherId === 503 ||
        weatherId === 504"/>
    <WIDayRainMix
      v-if="weatherId === 511 ||
        weatherId === 611 ||
        weatherId === 612 ||
        weatherId === 615 ||
        weatherId === 616 ||
        weatherId === 620"/>
    <WIDayShowers
      v-if="weatherId === 520 ||
        weatherId === 521 ||
        weatherId === 522 ||
        weatherId === 701"/>
    <WIDaySleet v-if="weatherId === 601"/>
    <WIDaySnow
      v-if="weatherId === 600 ||
        weatherId === 602 ||
        weatherId === 621 ||
        weatherId === 622"/>
    <WIDaySprinkle
      v-if="weatherId === 300 ||
        weatherId === 301 ||
        weatherId === 321 ||
        weatherId === 500"/>
    <WIDayStormShowers v-if="weatherId === 531"/>
    <WIDaySunny v-if="weatherId === 800"/>
    <WIDaySunnyOvercast v-if="weatherId === 804"/>
    <WIDayThunderstorm
      v-if="weatherId === 200 ||
        weatherId === 201 ||
        weatherId === 202 ||
        weatherId === 230 ||
        weatherId === 231 ||
        weatherId === 232"/>
    <WIDust
      v-if="weatherId === 731 ||
        weatherId === 761 ||
        weatherId === 762"/>
    <WIHot v-if="weatherId === 904"/>
    <WIHurricane v-if="weatherId === 902"/>
    <WISmoke v-if="weatherId === 711"/>
    <WISnowflakeCold v-if="weatherId === 903"/>
    <WIStrongWind v-if="weatherId === 957"/>
    <WITornado
      v-if="weatherId === 781 ||
        weatherId === 900"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import {
  WIDayCloudyGusts,
  WIDayFog,
  WIDayHail,
  WIDayHaze,
  WIDayLightning,
  WIDayRain,
  WIDayRainMix,
  WIDayShowers,
  WIDaySleet,
  WIDaySnow,
  WIDaySprinkle,
  WIDayStormShowers,
  WIDaySunny,
  WIDaySunnyOvercast,
  WIDayThunderstorm,
  WIDust,
  WIHot,
  WIHurricane,
  WISmoke,
  WISnowflakeCold,
  WIStrongWind,
  WITornado
} from '@/components/weather-icons'

@Component({
  components: {
    WIDayCloudyGusts,
    WIDayFog,
    WIDayHail,
    WIDayHaze,
    WIDayLightning,
    WIDayRain,
    WIDayRainMix,
    WIDayShowers,
    WIDaySleet,
    WIDaySnow,
    WIDaySprinkle,
    WIDayStormShowers,
    WIDaySunny,
    WIDaySunnyOvercast,
    WIDayThunderstorm,
    WIDust,
    WIHot,
    WIHurricane,
    WISmoke,
    WISnowflakeCold,
    WIStrongWind,
    WITornado
  }
})
export default class WeatherIconViewer extends Vue {
  @Prop() public id!: number
  @Prop() public time!: number
  @Prop() public sunrise!: number
  @Prop() public sunset!: number

  get weatherId () {
    return this.id
  }
}
</script>

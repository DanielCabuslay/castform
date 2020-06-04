import Vue from 'vue'
import { environment } from '@/environment/environment'

export class WeatherService extends Vue {
  getCurrentWeather (query: string) {
    const params = {
      q: query,
      units: 'metric',
      appId: environment.apiKey
    }
    return this.$http.get(environment.apiUrl + 'weather', { params })
  }

  getCurrentLocationWeather (lat: number, lon: number) {
    const params = {
      lat,
      lon,
      units: 'metric',
      appId: environment.apiKey
    }
    return this.$http.get(environment.apiUrl + 'weather', { params })
  }

  getCurrentLocationWeatherOneCall (lat: number, lon: number) {
    const params = {
      lat,
      lon,
      units: 'metric',
      exclude: 'minutely',
      appId: environment.apiKey
    }
    return this.$http.get(environment.apiUrl + 'onecall', { params })
  }

  getDailyForecast (query: string) {
    const params = {
      q: query,
      units: 'metric',
      appId: environment.apiKey
    }
    return this.$http.get(environment.apiUrl + 'forecast/daily', { params })
  }
}

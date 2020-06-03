import { Vue } from 'vue-property-decorator'
import { environment } from '@/environment/environment'

export class WeatherService extends Vue {
  getCurrentWeather (query: string) {
    const params = {
      q: query,
      units: 'metric',
      appId: environment.apiKey
    }
    this.$http.get(environment.apiUrl + 'weather', { params })
  }

  getDailyForecast (query: string) {
    const params = {
      q: query,
      units: 'metric',
      appId: environment.apiKey
    }
    this.$http.get(environment.apiUrl + 'forecast/daily', { params })
  }
}

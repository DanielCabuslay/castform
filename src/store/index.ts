import Vue from 'vue'
import Vuex from 'vuex'
import { WeatherService } from '@/services/WeatherService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: null,
    hourlyForecast: null,
    dailyForecast: null,
    timezone: null,
    showSettings: false,
    isDaytime: true,
    defaultCityId: localStorage.getItem('defaultCityId'),
    units: localStorage.getItem('units'),
    showAmPm: localStorage.getItem('showAmPm'),
    locationAccess: localStorage.getItem('locationAccess')
  },
  mutations: {
    updateCurrentWeather (state, weather) {
      state.currentWeather = weather
      state.isDaytime = weather.dt >= weather.sunrise && weather.dt < weather.sunset
    },
    updateHourlyForecast (state, forecast) {
      state.hourlyForecast = forecast
    },
    updateDailyForecast (state, forecast) {
      state.dailyForecast = forecast
    },
    updateDefaultCityId (state) {
      state.defaultCityId = localStorage.getItem('defaultCityId')
    },
    updateUnits (state) {
      state.units = localStorage.getItem('units')
    },
    updateShowAmPm (state) {
      state.showAmPm = localStorage.getItem('showAmPm')
    },
    changeSettingsState (state, isOpen) {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'initial'
      }
      state.showSettings = isOpen
    },
    updateLocationAccess (state) {
      state.locationAccess = localStorage.getItem('locationAccess')
    },
    updateTimezone (state, timezone) {
      state.timezone = timezone
    },
    updateIsDaytime (state, isDaytime) {
      state.isDaytime = isDaytime
    }
  },
  getters: {
    currentWeather: (state) => {
      return state.currentWeather
    },
    hourlyForecast: (state) => {
      return state.hourlyForecast
    },
    dailyForecast: (state) => {
      return state.dailyForecast
    },
    defaultCityId: (state) => {
      return state.defaultCityId
    },
    units: (state) => {
      return state.units
    },
    showAmPm: (state) => {
      return state.showAmPm
    },
    showSettings: (state) => {
      return state.showSettings
    },
    locationAccess: (state) => {
      return state.locationAccess
    },
    timezone: (state) => {
      return state.timezone
    },
    isDaytime: (state) => {
      return state.isDaytime
    }
  },
  actions: {
    async updateCurrentWeather (context, query) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        weatherService.getCurrentWeather(query).then((response: any) => {
          context.commit('updateCurrentWeather', response.body)
          localStorage.setItem('defaultCityId', response.body.id)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    },
    async updateCurrentWeatherById (context, id) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        weatherService.getCurrentWeatherById(id).then((response: any) => {
          context.commit('updateCurrentWeather', response.body)
          localStorage.setItem('defaultCityId', response.body.id)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    },
    async getCurrentLocationWeather (context, { lat, lon }) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        weatherService.getCurrentLocationWeather(lat, lon).then((response: any) => {
          context.commit('updateCurrentWeather', response.body)
          localStorage.setItem('defaultCityId', response.body.id)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    },
    async getCurrentLocationWeatherOneCall (context, { lat, lon }) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        weatherService.getCurrentLocationWeatherOneCall(lat, lon).then((response: any) => {
          context.commit('updateCurrentWeather', response.body.current)
          context.commit('updateHourlyForecast', response.body.hourly)
          context.commit('updateDailyForecast', response.body.daily)
          context.commit('updateTimezone', response.body.timezone)
          console.log(response.body)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    },
    async updateDefaultCityId (context, id) {
      return new Promise((resolve) => {
        localStorage.setItem('defaultCityId', id)
        context.commit('updateDefaultCityId')
        resolve()
      })
    },
    async updateUnits (context, unit) {
      return new Promise((resolve) => {
        localStorage.setItem('units', unit)
        context.commit('updateUnits')
        resolve()
      })
    },
    async updateShowAmPm (context, format) {
      return new Promise((resolve) => {
        localStorage.setItem('showAmPm', format)
        context.commit('updateShowAmPm')
        resolve()
      })
    },
    async updateLocationAccess (context) {
      return new Promise((resolve) => {
        localStorage.setItem('locationAccess', 'true')
        context.commit('updateLocationAccess')
        resolve()
      })
    }
  },
  modules: {
  }
})

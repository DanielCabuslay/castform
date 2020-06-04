import Vue from 'vue'
import Vuex from 'vuex'
import { WeatherService } from '@/services/WeatherService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: null,
    units: localStorage.getItem('units'),
    showSettings: false
  },
  mutations: {
    updateCurrentWeather (state, weather) {
      state.currentWeather = weather
    },
    updateUnits (state) {
      state.units = localStorage.getItem('units')
    },
    changeSettingsState (state) {
      state.showSettings = !state.showSettings
    }
  },
  getters: {
    currentWeather: (state) => {
      return state.currentWeather
    },
    units: (state) => {
      return state.units
    },
    showSettings: (state) => {
      return state.showSettings
    }
  },
  actions: {
    async updateCurrentWeather (context, query) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        weatherService.getCurrentWeather(query).then((response: any) => {
          context.commit('updateCurrentWeather', response.body)
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
          // context.commit('updateCurrentWeather', response.body)
          console.log(response.body)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    },
    async updateUnits (context, unit) {
      return new Promise((resolve) => {
        localStorage.setItem('units', unit)
        context.commit('updateUnits')
        resolve()
      })
    }
  },
  modules: {
  }
})

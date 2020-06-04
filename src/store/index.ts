import Vue from 'vue'
import Vuex from 'vuex'
import { WeatherService } from '@/services/WeatherService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentWeather: null,
    metric: true
  },
  mutations: {
    updateCurrentWeather (state, weather) {
      state.currentWeather = weather
    },
    setTemperatureUnits (state) {
      state.metric = !state.metric
    }
  },
  getters: {
    currentWeather: (state) => {
      return state.currentWeather
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
          console.log(response.body)
          context.commit('updateCurrentWeather', response.body)
          resolve()
        }, (error) => {
          console.error(error)
          reject(error)
        })
      })
    }
  },
  modules: {
  }
})

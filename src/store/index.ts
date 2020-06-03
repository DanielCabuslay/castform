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
    async updateCurrentWeather (context) {
      return new Promise((resolve, reject) => {
        const weatherService = new WeatherService()
        const weather = '4'
        context.commit(weather)
        resolve()
      })
    }
  },
  modules: {
  }
})

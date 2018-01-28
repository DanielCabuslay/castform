import Vue from 'vue';
import App from './app.vue';
import Main from './components/main.vue';
import Header from './components/header.vue';
import Current from './components/current_forecast.vue';
import Dialog from './components/dialog.vue';

Vue.component('main-app', Main);
Vue.component('app-header', Header);
Vue.component('current-forecast', Current);
Vue.component('app-dialog', Dialog);

new Vue({
  el: '#app',
  render: h => h(App)
});
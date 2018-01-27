import Vue from 'vue';
import App from './app.vue';
import Main from './components/main.vue';
import Header from './components/header.vue';

Vue.component('main-app', Main);
Vue.component('app-header', Header);
const apiKey = '2a6756e781c723daf2ae3f1e9a8fb98b';

new Vue({
  el: '#app',
  render: h => h(App)
});
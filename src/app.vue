<template>
  <main>
    <header>
      <section>
        <h1>Castform</h1>
      </section>
      <section>
        <form @submit.prevent="sendQuery">
          <input id="search" v-model="input" type="text"
          placeholder="Search for city" autocomplete="off">   
        </form>
      </section>
    </header>
    <main-app :query="query"></main-app>
    <div id="watermark_text">
      Weather provided by <a target="_blank" ref="noopener noreferrer" href="https://openweathermap.org/">OpenWeatherMap</a>
    </div>
  </main>
</template>

<script>
  import Main from './components/main.vue';

  export default {
    data () {
      return {
        input: '',
        query: ''
      }
    },
    components: {
      'main-app': Main
    },
    methods: {
      sendQuery: function() {
        this.query = this.input;
      }
    }
  }
</script>

<style>
  :root {
    --weather-clear-day: deepskyblue;
    --weather-mixed-day: skyblue;
    --weather-overcast-day: #bbb;
    --weather-rain-day: #999;
    --weather-thunderstorm-day: grey;
    --weather-snow-day: #ccc;
    --weather-clear-night: #001f3a;
    --weather-overcast-night: #1e1e1e;
    --search-background-day: rgba(0, 0, 0, 0.1);
    --search-background-night: rgba(255, 255, 255, 0.1);
  }
  html {
    height: 100vh;
  }
  body {
    height: 100%;
    margin: 0;
    background-color: grey;
    transition: background-color 1s;
    color: rgba(255, 255, 255, 0.9);
  }
  main {
    font-family: 'Open Sans', sans-serif;
    position: relative;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  }
  h1, h2 {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    color: white;
  }
  header {
    display: flex;
    flex-direction: row;
    background: linear-gradient(rgba(0, 0, 0, 0.1), transparent);
    height: 56px;
  }
  header section {
    display: inline-flex;
    flex: 1;
    justify-content: center;
    margin: auto;
  }
  header section:first-child {
    justify-content: flex-start;
    margin-left: 1rem;
  }
  header section:last-child {
    justify-content: flex-end;
    margin-right: 1rem;
  }
  header h1 {
    margin: auto 0;
  }
  form {
    margin: auto 0;
  }
  input {
    background: var(--search-background-day);
    transition: background 1s;
    border: none;
    border-radius: 2px;
    padding: 4px;
    color: white;
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.33);
  }
  #watermark_text {
    position: fixed;
    bottom: 0.5rem;
    right: 1rem;
    color: rgba(255, 255, 255, 0.33);
    font-size: 0.75rem;
  }
  #watermark_text a {
    text-decoration: none;
    color: inherit;
  }
</style>

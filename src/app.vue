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
      <section>
        <nav>
          <a @click="promptGPS">
            <i class="fas fa-map-marker fa-fw header_menu"></i>
          </a>
          <a>
            <i class="fas fa-cog fa-fw header_menu"></i>
          </a>
        </nav>
      </section>
    </header>
    <main-app :query="query" :position="position"></main-app>
    <div id="watermark_text">
      Weather data provided by <a target="_blank" ref="noopener noreferrer" href="https://openweathermap.org/">OpenWeatherMap</a>
    </div>
  </main>
</template>

<script>
  import Main from './components/main.vue';

  export default {
    data () {
      return {
        input: '',
        query: '',
        position: ''
      }
    },
    components: {
      'main-app': Main
    },
    created: function() {
      this.promptGPS();
    },
    methods: {
      sendQuery: function() {
        this.query = this.input;
      },
      sendPosition: function(pos) {
        this.position = pos;
      },
      sendDefaultLocation: function() {
        //placeholder until setting is configured
        this.query = 'Toronto';
      },
      promptGPS: function() {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(this.sendPosition, this.sendDefaultLocation);
        } else {
          this.sendDefaultLocation();
        }
      },
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
    --shadow: rgba(0, 0, 0, 0.2);
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
    text-shadow: 0px 1px 2px var(--shadow);
    height: 100%;
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
  header nav a {
    margin: 0.5em;
    transition: 0.25s color;
  }
  header nav a:first-child {
    margin-left: 0;
  }
  header nav a:last-child {
    margin-right: 0;
  }
  header nav a:hover {
    color: white;
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
    width: 15em;
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.33);
  }
  .header_menu {
    font-size: 1.5em;
    filter: drop-shadow(0px 1px 2px var(--shadow));
    cursor: pointer;
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
  @media (max-width: 480px) {
    header section:first-child {
      display: none;
      text-align: left;
    }
    header section:nth-of-type(2) {
      margin-left: 1rem;
    }
  }
</style>

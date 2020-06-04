<template>
  <div id="settings" v-if="this.$store.getters.showSettings">
    <div class="modal">
      <h1>Settings</h1>
      <!-- <hr> -->
      <div class="row">
        <div>Unit</div>
        <select v-model="units" @change="unitChange()" :disabled="disabled">
          <option value="metric" selected>Metric (&deg;C, km/h)</option>
          <option value="imperial">Fahrenheit (&deg;F, mph)</option>
        </select>
      </div>
      <!-- <hr> -->
      <div class="row">
        <button @click="closeSettings()" :disabled="disabled">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component
export default class Settings extends Vue {
  units = null
  disabled = false

  beforeCreate () {
    if (!localStorage.getItem('units')) {
      localStorage.setItem('units', 'metric')
      this.$store.dispatch('updateUnits', 'metric').then(() => {
        this.units = this.$store.getters.units
        this.disabled = false
      })
    }
  }

  mounted () {
    this.units = this.$store.getters.units
  }

  unitChange () {
    this.disabled = true
    this.$store.dispatch('updateUnits', this.units).then(() => {
      this.units = this.$store.getters.units
      this.disabled = false
    })
  }

  closeSettings () {
    this.$store.commit('changeSettingsState')
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/variables';

#settings {
  z-index: 1;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background: $blacktranslucent;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  width: 300px;
  padding: 0 1rem 1rem;
  background: white;
  border-radius: 0.25rem;
  box-shadow: $shadow;
}
h1 {
  margin: 1rem 0;
}
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
  font-weight: 500;
  &:last-of-type {
      margin: 1rem 0 0;
      justify-content: flex-end;
  }
}
select {
  padding: 0.25rem;
  font-weight: 500;
}
button {
  background: transparent;
  font-size: 1em;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  color: $accent;
  font-size: 1em;
  border: 1px solid $accent;
}
</style>

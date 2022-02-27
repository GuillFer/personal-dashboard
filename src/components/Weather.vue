<template>
  <div class="widget" id="weather">
    <form action="#" id="weather-form">
      <BaseInput label="Ville" />
      <BaseButton label="Rechercher" />
      <BaseButton label="Géoloc" />"
    </form>
    <div id="weather-container">
      <h2 id="weather-title">Météo {{city}} - {{date}}</h2>
      <div class="weather-details">
        <!-- <img class="weather-icon" :src="require(`@/assets/weather-icons/${city}.svg`)"/> -->
        <p id="weather-description">{{weather.weather[0].description}}</p>
        <h3>{{storedWeather.main.temp}} °C</h3>
      </div>
    </div>
  </div>
</template>

<script>
import weatherApi from '@/services/weather'

export default {
  data() {
    return {
      cities: ['Paris','Nantes','Angers','Cholet'],
      city: this.$store.state.cityWeather,
      date: new Date().toLocaleDateString(),
      token: "",
      weather: '',
      weatherIcons: {
        'Clear': 'wi-day-sunny',
        'Clouds': 'wi-cloudy',
        'Rain': 'wi-rain'
      }
    }
  },
  computed: {
    storedWeather() {
      return this.$store.state.weather
    },
    weatherIcon() {
      const main = this.weather.weather[0].main
      return this.weatherIcons[main]
    }
  },
  beforeCreate() {
    if (!this.$store.state.weather) {
      const weather = weatherApi.fetchWeather(this.$store.state.cityWeather)
      this.$store.state.weather = weather
    } else {
      this.weather = this.$store.state.weather
    }
  }
}

</script>

<style scoped>
  #weather {
    width:45%;
  }

  #weather-form {
    display:flex;
    align-items:center;
    margin:auto;
  }

  #weather-form > * {
    margin:0 16px;
  }

  #weather-form > button {
    align-self:center!important;
  }

  .weather-icon {
    height:80px;
    width:80px;
  }

  .weather-details {
    display:flex;
    align-items:center;
    justify-content:space-evenly;
  }

</style>

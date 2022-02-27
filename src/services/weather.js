const openWeather = 'https://api.openweathermap.org/data/2.5/weather'
const token = ''

export default {
  fetchWeather(query) {
    console.log(openWeather)
    fetch(`${openWeather}?q=${query}&units=metric&appid=${token}&lang=fr`)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      });
  },
  fetchWeatherByCoordinates(coord) {
    fetch(`${openWeather}?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${token}`)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        return data
      });
  }
}

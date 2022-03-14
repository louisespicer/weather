function displayTemperature(response) {
  console.log(response.data);
  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity + " %";
  windSpeed.innerHTML = response.data.wind.speed + " km/h";
}

let apiKey = "e5128a69873aca4252645b70fe70eb05";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);

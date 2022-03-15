function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

function displayTemperature(response) {
  console.log(response.data);

  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let currentIcon = document.querySelector("#icon");
  let iconDescription = response.data.weather[0].main;

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  weatherDescription.innerHTML = response.data.weather[0].description;
  currentHumidity.innerHTML = response.data.main.humidity + " %";
  windSpeed.innerHTML = response.data.wind.speed + " km/h";

  if (iconDescription == "Thunderstorm") {
    currentIcon.setAttribute("class", "fas fa-bolt-lightning main col");
  } else if (iconDescription == "Drizzle") {
    currentIcon.setAttribute("class", "fas fa-cloud-rain");
  } else if (iconDescription == "Rain") {
    currentIcon.setAttribute("class", "fas fa-cloud-showers-heavy");
  } else if (iconDescription == "Snow") {
    currentIcon.setAttribute("class", "fas fa-snowflake");
  } else if (iconDescription == "Atmosphere") {
    currentIcon.setAttribute("class", "fas fa-smog");
  } else if (iconDescription == "Clear") {
    currentIcon.setAttribute("class", "fas fa-sun");
  } else if (iconDescription == "Clouds") {
    currentIcon.setAttribute("class", "fas fa-cloud main col");
  }
}

let city = "london";
let apiKey = "e5128a69873aca4252645b70fe70eb05";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);

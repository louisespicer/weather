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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thur", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
       <div class="col">
        <div class="day"> ${day}</div>
          <i class="fas fa-wind"></i>
          <div class="forecast-temp">
            <span class="max-temp"> 18 </span>
            <span class="min-temp"> 12 </span>
        </div>
      </div>
      
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayTemperature(response) {
  console.log(response.data);

  let currentTemperature = document.querySelector("#temperature");
  let currentCity = document.querySelector("#city");
  let weatherDescription = document.querySelector("#description");
  let currentHumidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let currentIcon = document.querySelector("#icon");
  let iconDescription = response.data.weather[0].main;

  displayForecast();

  celsiusTemp = response.data.main.temp;

  currentTemperature.innerHTML = Math.round(celsiusTemp);
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

function search(city) {
  let apiKey = "e5128a69873aca4252645b70fe70eb05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let userInput = document.querySelector("#city-input");
  search(userInput.value);
}

function calculateFahrenheit(event) {
  event.preventDefault();
  let changeTemperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  changeTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function calculateCelsius(event) {
  event.preventDefault();
  let changeTemperature = document.querySelector("#temperature");
  changeTemperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search");
form.addEventListener("submit", handleSubmit);

let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", calculateFahrenheit);

let toCelsius = document.querySelector("#celsius");
toCelsius.addEventListener("click", calculateCelsius);

search("London");

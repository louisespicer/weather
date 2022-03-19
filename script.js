let apiKey = "e5128a69873aca4252645b70fe70eb05";

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

function formatDay(timestamp){
  let date = new Date(timestamp * 1000)
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"]

  return days[day];
  
}



function displayForecast(response) {
  let forecast = response.data.daily
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  
  forecast.forEach(function (forecastDay, index) {
     if(index < 5){
        let iconElement = "";
        if(forecastDay.weather[0].main == "Thunderstorm"){
          iconElement = "fas fa-bolt-lightning"
        } else if (forecastDay.weather[0].main == "Drizzle"){
          iconElement = "fas fa-cloud-rain"
        } else if (forecastDay.weather[0].main == "Rain"){
          iconElement = "fas fa-cloud-showers-heavy"
        } else if (forecastDay.weather[0].main == "Snow"){
          iconElement = "fas fa-snowflake"
        } else if (forecastDay.weather[0].main == "Atmosphere"){
          iconElement = "fas fa-smog"
        } else if (forecastDay.weather[0].main == "Clear"){
          iconElement = "fas fa-sun"
        } else if (forecastDay.weather[0].main == "Clouds"){
          iconElement = "fas fa-cloud"
        }
      

    forecastHTML =
      forecastHTML +
      `
       <div class="col">
        <div class="day"> ${formatDay(forecastDay.dt)}</div>
          <i class="${iconElement}" id="icon-forecast"></i>
          <div class="forecast-temp">
            <span class="max-temp"> ${Math.round(forecastDay.temp.max)} </span>
            <span class="min-temp"> ${Math.round(forecastDay.temp.min)} </span>
        </div>
      </div>
      
      `;
      }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
  console.log(coordinates)
  let apiKey = "e5128a69873aca4252645b70fe70eb05";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayForecast);


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


  getForecast(response.data.coord);
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

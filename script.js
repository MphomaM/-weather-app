function currentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDay = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[currentDay];

  return `${day} ${hours}:${minutes}`;
}
function celsiusToFahrenheit(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = 81;
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temperatureValue = document.querySelector("#temperature");
  temperatureValue.innerHTML = 27;
}

let dateValue = document.querySelector("#date");
let currentTime = new Date();
dateValue.innerHTML = currentDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitValue = document.querySelector("#fahrenheit-value");
fahrenheitValue.addEventListener("click", celsiusToFahrenheit);

let celsiusValue = document.querySelector("#celsius-value");
celsiusValue.addEventListener("click", fahrenheitToCelsius);

function displayTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchLocation(city) {
  let apiKey = "3168ba2894e81261ba71f5c34bdd6b75";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchLocation(city);
}

function lookUpLocation(position) {
  let apiKey = "3168ba2894e81261ba71f5c34bdd6b75";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(url).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(lookUpLocation);
}

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", getCurrentLocation);

searchLocation("Johannesburg");

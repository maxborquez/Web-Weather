import "./styles.css";
import clearday from "./assets/WeatherIcons/clear-day.svg";
import clearnight from "./assets/WeatherIcons/clear-night.svg";
import cloudy from "./assets/WeatherIcons/cloudy.svg";
import fog from "./assets/WeatherIcons/fog.svg";
import hail from "./assets/WeatherIcons/hail.svg";
import partlycloudyday from "./assets/WeatherIcons/partly-cloudy-day.svg";
import partlycloudynight from "./assets/WeatherIcons/partly-cloudy-night.svg";
import rainsnowshowersday from "./assets/WeatherIcons/rain-snow-showers-day.svg";
import rainsnowshowersnight from "./assets/WeatherIcons/rain-snow-showers-night.svg";
import rainsnow from "./assets/WeatherIcons/rain-snow.svg";
import rain from "./assets/WeatherIcons/rain.svg";
import showersday from "./assets/WeatherIcons/showers-day.svg";
import showersnight from "./assets/WeatherIcons/showers-night.svg";
import sleet from "./assets/WeatherIcons/sleet.svg";
import snowshowersday from "./assets/WeatherIcons/snow-showers-day.svg";
import snowshowersnight from "./assets/WeatherIcons/snow-showers-night.svg";
import snow from "./assets/WeatherIcons/snow.svg";
import thunerrain from "./assets/WeatherIcons/thunder-rain.svg";
import thundershowersday from "./assets/WeatherIcons/thunder-showers-day.svg";
import thundershowersnight from "./assets/WeatherIcons/thunder-showers-night.svg";
import thunder from "./assets/WeatherIcons/thunder.svg";
import wind from "./assets/WeatherIcons/wind.svg";

const weatherIcons = {
  "clear-day": clearday,
  "clear-night": clearnight,
  cloudy: cloudy,
  fog: fog,
  hail: hail,
  "partly-cloudy-day": partlycloudyday,
  "partly-cloudy-night": partlycloudynight,
  "rain-snow-showers-day": rainsnowshowersday,
  "rain-snow-showers-night": rainsnowshowersnight,
  "rain-snow": rainsnow,
  rain: rain,
  "showers-day": showersday,
  "showers-night": showersnight,
  sleet: sleet,
  "snow-showers-day": snowshowersday,
  "snow-showers-night": snowshowersnight,
  snow: snow,
  "thunder-rain": thunerrain,
  "thunder-showers-day": thundershowersday,
  "thunder-showers-night": thundershowersnight,
  thunder: thunder,
  wind: wind,
};

const cityName = document.getElementById("city-name");
const grad = document.getElementById("grad");
const descrption = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

const searchInput = document.getElementById("search");

let currentUnit = "celsius";

function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

async function getWeather(city) {
  const response = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" +
      city +
      "?key=47Q9CXZJECE5G3RR5TVCTGNCM",
    { mode: "cors" }
  );

  const weatherData = await response.json();

  return weatherData;
}

function dateFormatter(date) {
  const day = new Date(date);
  const dayName = day.toLocaleDateString("en-US", { weekday: "long" });

  return dayName;
}

function renderCurrent(data) {
  const temp =
    currentUnit === "celsius"
      ? Math.round(toCelsius(data.currentConditions.temp)) + "°C"
      : data.currentConditions.temp + "°F";

  cityName.textContent = data.resolvedAddress;
  grad.textContent = temp;
  descrption.textContent = data.currentConditions.conditions;
  weatherIcon.src = weatherIcons[data.currentConditions.icon];
}

function renderNext(data) {
  const cardContainer = document.getElementById("six-days");
  cardContainer.innerHTML = ``;
  for (let i = 2; i <= 7; i++) {
    const card = document.createElement("div");
    card.classList.add("day-card");

    const cardDate = document.createElement("h2");
    cardDate.textContent = dateFormatter(data.days[i].datetime);
    card.appendChild(cardDate);

    const cardInfo = document.createElement("div");
    cardInfo.id = "days-icon-grad";

    const icon = document.createElement("img");
    icon.classList.add("days-icon");
    icon.src = weatherIcons[data.days[i].icon];

    const temp =
      currentUnit === "celsius"
        ? Math.round(toCelsius(data.days[i].temp)) + "°C"
        : data.days[i].temp + "°F";

    const grad = document.createElement("p");
    grad.classList.add("days-grad");
    grad.textContent = temp;

    cardInfo.appendChild(icon);
    cardInfo.appendChild(grad);

    card.appendChild(cardInfo);
    cardContainer.appendChild(card);
  }
}

searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const city = searchInput.value;
    try {
      const data = await getWeather(city);
      renderCurrent(data);
      renderNext(data);
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  }
});

const unitSelector = document.getElementById("temperature-scale");

unitSelector.addEventListener("change", async function () {
  currentUnit = this.value;
  const city = searchInput.value || "tokio";
  try {
    const data = await getWeather(city);
    renderCurrent(data);
    renderNext(data);
  } catch (error) {
    console.error("Error al actualizar el clima:", error);
  }
});

async function defaultWather() {
  try {
    const data = await getWeather("tokio");
    renderCurrent(data);
    renderNext(data);
  } catch (error) {
    console.error("Error al obtener el clima:", error);
  }
}

defaultWather();

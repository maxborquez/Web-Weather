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

const cityName = document.getElementById("city-name");
const grad = document.getElementById("grad");
const descrption = document.getElementById("description");
const weatherIcon = document.getElementById("weather-icon");

const searchInput = document.getElementById("search");

searchInput.addEventListener("keydown", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    const city = searchInput.value;
    try {
      const data = await getWeather(city);

      cityName.textContent = data.resolvedAddress;
      grad.textContent = data.currentConditions.temp + "°F";
      descrption.textContent = data.currentConditions.conditions;
      weatherIcon.src = weatherIcons[data.currentConditions.icon];
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    }
  }
});

const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const searchInput = document.querySelector(".search-box input");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");

search.addEventListener("click", () => {
  searchWeather();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchWeather();
  }
});

function searchWeather() {
  const APIKey = "639f6d1dbd5e980f47d8d67c717c3083";
  const city = searchInput.value.trim();

  if (city === "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ru&appid=${APIKey}`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod === "404") {
        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        error404.style.display = "block";
        error404.classList.add("fadeIn");
        return;
      }

      error404.style.display = "none";
      error404.classList.remove("fadeIn");

      const image = document.querySelector(".weather-box img");
      const temperature = document.querySelector(".weather-box .temperature");
      const description = document.querySelector(".weather-box .description");
      const humidity = document.querySelector(
        ".weather-details .humidity span"
      );
      const wind = document.querySelector(".weather-details .wind span");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "";
      }

      temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}%`;
      wind.innerHTML = `${getWindDirectionInRussian(json.wind.deg)}, ${
        json.wind.speed
      } м/с`;

      weatherBox.style.display = "";
      weatherDetails.style.display = "";
      weatherBox.classList.add("fadeIn");
      weatherDetails.classList.add("fadeIn");
      container.style.height = "590px";
    });
}

function getWindDirectionInRussian(degree) {
  const directions = [
    "ветер-Северный",
    "ветер-Северо-северо-восточный",
    "ветер-Северо-восточный",
    "ветер-Восточно-северо-восточный",
    "ветер-Восточный",
    "ветер-Восточно-юго-восточный",
    "ветер-Юго-восточный",
    "ветер-Юго-юго-восточный",
    "ветер-Южный",
    "ветер-Юго-юго-западный",
    "ветер-Юго-Западный",
    "ветер-Западно-юго-западный",
    "ветер-Западный",
    "ветер-Западно-северо-западный",
    "ветер-Северо-западный",
    "ветер-Северо-северо-западный",
    "ветер-Северный",
  ];

  const index = Math.round((degree % 260) / 18.5);
  return directions[index];
}

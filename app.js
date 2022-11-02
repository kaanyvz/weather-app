const cityEl = document.querySelector(".city");
const iconEl = document.querySelector(".icon");
const descriptionEl = document.querySelector(".description");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const feels_likeEl = document.querySelector(".feels_like");
const temp_maxEl = document.querySelector(".temp_max");
const temp_minEl = document.querySelector(".temp_min");
const windEl = document.querySelector(".wind");
const weatherEl = document.querySelector(".weather");
const searchBarEl = document.querySelector(".search-bar");
const searchButtonEl = document.querySelector(".search button");

let weather = {
  key: "432beb7f298b95a92177c0be359f9fc3",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.key
    )
      .then((response) => {
        if (!response.ok) {
          alert("No weather found.");
          throw new Error("No weather found.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity, feels_like, temp_max, temp_min  } = data.main;
    const { speed } = data.wind;
    cityEl.innerText = "Weather in " + name;
    iconEl.src = "https://openweathermap.org/img/wn/" + icon + ".png";
    descriptionEl.innerText = description;
    tempEl.innerText = temp + "°C";
    humidityEl.innerText = "Humidity: " + humidity + "%";
    feels_likeEl.innerText = "Feels like : " + feels_like;
    temp_minEl.innerText = "Min Temp : " + temp_min  
    temp_maxEl.innerText = "Max Temp : " + temp_max
    windEl.innerText = "Wind speed: " + speed + " km/h";
    weatherEl.classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";
  },
  search: function () {
    this.fetchWeather(searchBarEl.value);
  },
};

searchButtonEl.addEventListener("click", () => {
  weather.search();
});

searchBarEl.addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Istanbul");

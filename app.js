let weather = {
  apiKey: "1b77300c7983e268eee648b819aab5d0",
  FetchWeather: function (city) {
    // fetching open weather map
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then(
        (response) => response.json() // covert the data into the readable json format
      )
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // check the input
    // console.log(name, icon, description, temp, humidity, speed);

    // now display this data
    // city name
    document.querySelector(".city").innerText = "Weather in " + name;
    // icon
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/wn/" + icon + ".png";
    // temp
    document.querySelector(".temp").innerText = temp + "°C";
    // humidity
    document.querySelector(".humidity").innerText =
      "Humidity: " + humidity + "%";
    // wind speed
    document.querySelector(".wind").innerText =
      "Wind Speed: " + speed + " km/h";
    //   description
    document.querySelector(".description").innerText = description;

    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/random/1920x1080/?" + name + "')";
  },

  // searching input i.e, city name
  search: function () {
    this.FetchWeather(document.querySelector(".search-bar").value); // it call fetchWeather function.
  },
};

// now we are getting city name as a input

document.querySelector(".search button").addEventListener("click", () => {
  weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", (event) => {
  if (event.key == "Enter") {
    weather.search();
  }
});

// default location
weather.FetchWeather("Nagpur");

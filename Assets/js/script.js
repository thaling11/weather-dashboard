//variables
var APIkey = "a680d80e94900005ef907a18f28f496e";
var searchBtn = document.querySelector("#search-button");
// var cityInput = document.querySelector("city-input");

var currentCity = "";
var searchedCities = [];
var storeCities = document.querySelector("#storeCitiesButton");

//fetch API weather data
function getWeatherdata() {
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`;
  fetch(requestUrl)
    .then((response) => response.json())
    .then(function (data) {
      storeData();
      console.log(data);
      getCoordinates(data);
    });
}

//fetch latitude and longitude from city name
function getCoordinates(data) {
  var lat = data[0].lat;
  var lon = data[0].lon;
  var coordinateData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIkey}&units=imperial`;
  fetch(coordinateData)
    .then((response) => response.json())
    .then(function (data) {
      fetch(coordinateData)
        .then((response) => response.json())
        .then(function (data) {
          console.log(data);
          currentWeather(data);
          fiveDay(data);
        });
    });
}


function currentWeather(data) {
  let currentHeader = document.querySelector("#current-header");
  let current = document.querySelector("#currentConditions");
  let weatherIconCode = "";

  // let cityName = document.createElement("h4");
  // cityName.textContent =

  let currentDate = document.createElement("h4");
  currentDate = data.current.dt;
  currentDate = moment.unix(currentDate).format("MM/DD/YY");
  currentHeader.append(currentDate);

  let temp = document.createElement("p");
  temp.classList.add("temp");
  temp.textContent = "Temperature: " + data.current.temp + " °F";
  current.append(temp);

  let icon = document.createElement("img");
  icon.classList.add("icon");
  weatherIconCode = data.current.weather[0].icon;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`
  );
  current.append(icon);

  let humidity = document.createElement("p");
  humidity.classList.add("humidity");
  humidity.textContent = "Humidity: " + data.current.humidity + "%";
  current.append(humidity);

  let windSpeed = document.createElement("p");
  windSpeed.classList.add("wind-speed");
  windSpeed.textContent = "Wind speed: " + data.current.wind_speed + " mph";
  current.append(windSpeed);

  let uvIndex = document.createElement("p");
  let uvIndexNumber = data.current.uvi;
  uvIndex.classList.add("uv-index");
  uvIndex.textContent = "UV Index: " + uvIndexNumber;
  if (uvIndexNumber < 3) {
    uvIndex.style.color = "green";
  } else if (uvIndexNumber < 6) {
    uvIndex.style.color = "yellow";
  } else if (uvIndexNumber < 8) {
    uvIndex.style.color = "orange";
  } else if (uvIndexNumber < 11) {
    uvIndex.style.color = "red";
  } else {
    uvIndex.style.color = "purple";
  }
  current.append(uvIndex);
}

//five day forecast
function fiveDay(data) {
  for (let index = 0; index < 5; index++) {
    let date;
    let temp;
    let icon;
    let windSpeed;
    let humidity;

    date = data.daily[index].dt;
    date = moment.unix(date).format("MM/DD/YY");

    let fiveDayTemp = document.createElement("p");
    temp = data.daily[index].temp.max;
    fiveDayTemp.classList.add("fiveDayTemp");
    fiveDayTemp.textContent = "Temp: " + temp + " °F";
    fiveDayTemp.append(temp);

    icon = data.daily[index].weather[0].icon;
    windSpeed = data.daily[index].wind_speed;
    humidity = data.daily[index].humidity;
  }
}

// //store in local storage
function storeData(data) {
    searchedCities.push(cityName);
    localStorage.setItem("searchedCity", JSON.stringify(searchedCities));
  }

//add history
function storeCities() {
  storeCitiesButton.innerHTML = "";

  let cityHistory = JSON.parse(localStorage.getItem("cities"));
  if (cityHistory != null) {
    for (let i = 0; i < cityHistory.length; i++) {
      let button = document.createElement("button");
      button.innerHTML = cityHistory[i];
      button.classList.add("btn", "btn-md", "btn-block");
      storeCitiesButton.appendChild(button);
    }
  }
}

storeCities();

//event listener to search button
searchBtn.addEventListener("click", function () {
  cityName = document.querySelector("#city-input").value;
  console.log(cityName);
  getWeatherdata();
  //   fiveDay();
});

//clear button event listener

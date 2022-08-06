//variables
var APIkey = "a680d80e94900005ef907a18f28f496e";
var searchBtn = document.querySelector("#search-button");
// var cityInput = document.querySelector("city-input");

var searchedCities = [];

//fetch API weather data
function getWeatherdata() {
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`;
    fetch(requestUrl)
    .then((response) => response.json())
    .then(function(data) {
        storeData();
        console.log(data);
        getCoordinates(data);
    })
}

//fetch latitude and longitude from city name
function getCoordinates(data) {
    var lat = data[0].lat;
    var lon = data[0].lon;
    var coordinateData = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIkey}&units=imperial`
    fetch(coordinateData)
    .then((response) => response.json())
    .then(function (data) {
        fetch(coordinateData)
        .then((response) => response.json())
        .then(function (data) {
            console.log(data);
            currentWeather(data);
        })
    })
};

function  currentWeather(data) {
   let current = document.querySelector("#currentConditions"); 
   let weatherIconCode = "";

    // let cityName = document.createElement("h2");
    // cityName.textContent = data[0].name;


    let temp = document.createElement("p");
    temp.classList.add("temp")
    temp.textContent = "Temperature: " + data.current.temp + "°F"
    current.append(temp);

    let icon = document.createElement("img");
    icon.classList.add("icon");
    weatherIconCode = data.current.weather[0].icon;
    icon.setAttribute("src", `http://openweathermap.org/img/wn/${weatherIconCode}@2x.png`);
    current.append(icon);

    let humidity = document.createElement("p");
    humidity.classList.add("humidity");
    humidity.textContent = "Humidity: " + data.current.humidity + "%";
    current.append(humidity);

    let windSpeed = document.createElement("p");
    windSpeed.classList.add("wind-speed");
    windSpeed.textContent = "Wind speed: " + data.current.wind_speed + "mph";
    current.append(windSpeed);
}


// //store in local storage
function storeData(data) {
    searchedCities.push(cityName);
    localStorage.setItem("searchedCity", JSON.stringify(searchedCities));
};

//five day forecast




//add history

//event listener to search button/clear button
searchBtn.addEventListener("click", function() {
    cityName = document.querySelector("#city-input").value;
    console.log(cityName);
    getWeatherdata();
    // getCoordinates();
});


   



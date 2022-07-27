//weather-api cUrl: website{id}
var APIkey = "e3c9bafef9a3ce15a82181805234f419";
//ID is available to us, based on data-id on click for the #get-weather button

//Data Flow: 
//button click event listener
//use id to fetch api weather data
//update website text content with weather api data


//variables
const searchButton = $("#search-button");
const clearHistoryBtn = $("#clear-history");
var cityInput = $("#enter-city");
var searchHistory = $("#search-history");
var currentCity;
//functions

//open weather API to get weather from coordinates
function retrieveWeather(data) {
    let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`
    fetch(requestUrl)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        var currentWeather = $("#currentWeather");
        currentWeather.addClass("border border-primary");

        var cityName = $("<h2>");
        cityName.text(currentCity);
        currentWeather.append(cityName);

        var currentCityDate = data.current.dt;
        currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
        var currentDate = $("<span>");
        currentDate.text(`(${currentCityDate})`);
        cityName.append(currentWeatherIcon);
    })
}

//spectial function --event listeners

//logic/start app if required
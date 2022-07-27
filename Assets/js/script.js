//weather-api cUrl: website{id}
var APIkey = "a680d80e94900005ef907a18f28f496e";
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
  let requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${APIkey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    //current weather
    .then(function (data) {
      var currentWeather = $("#currentWeather");
      currentWeather.addClass("border border-primary");
      //city name element
      var cityName = $("<h2>");
      cityName.text(currentCity);
      currentWeather.append(cityName);
      //date appended to city name
      var currentCityDate = data.current.dt;
      currentCityDate = moment.unix(currentCityDate).format("MM/DD/YYYY");
      var currentDate = $("<span>");
      currentDate.text(`(${currentCityDate})`);
      cityName.append(currentWeatherIcon);
      //weather icon append to city name
      var currentCityWeatherIcon = data.current.weather[0].icon;
      var currentWeatherIcon = $("<img>");
      currentWeatherIcon.attr(
        "src",
        "http://openweathermap.org/img/wn/" + currentCityWeatherIcon + ".png"
      );
      cityName.append(currentWeatherIcon);
      //current temp data
      var currentTemp = data.current.temp;
      var currentTempElement = $("<p>");
      currentTemp.text(`Temp: ${currentTemp}°C`);
      currentWeather.append(currentTempElement);

      //current wind speed
      var currentWind = data.current.wind_speed;
      var currentWindElement = $("<p>");
      currentWindElement.text(`Wind: ${currentWind} KPH`);
      currentWeather.append(currentWindElement);

      //current humidity
      var currentHumidity = data.current.humidity;
      var currentHumidityElement = $("<p>");
      currentHumidityElement.text(`Humidity: ${currentHumidity}%`);
      currentWeather.append(currentHumidityElement);
      
      //current UV index 
      var currentUV = data.current.uvi;
      var currentUvElement = $('<p>');
      var currentUvSpanEl = $('<span>');
      currentUvElement.append(currentUvSpanEl);
      currentUvSpanEl.text(`UV: ${currentUV}`)
      
      //set background color based on level 
    if ( currentUV < 3 ) {
        currentUvSpanEl.css({'background-color':'green', 'color':'white'});
    } else if ( currentUV < 6 ) {
        currentUvSpanEl.css({'background-color':'yellow', 'color':'black'});
    } else if ( currentUV < 8 ) {
        currentUvSpanEl.css({'background-color':'orange', 'color':'white'});
    } else if ( currentUV < 11 ) {
        currentUvSpanEl.css({'background-color':'red', 'color':'white'});
    } else {
        currentUvSpanEl.css({'background-color':'violet', 'color':'white'});
    }

    currentWeather.append(currentUvElement);

    //5 day forecast
    var forecastHeader = $("#forecastHeader");
    var forecastHeaderElement = $("<h2>");
    forecastHeaderElement.text("Five Day Forecast: ");
    forecastHeader.append(forecastHeaderElement);

    //weather info from API
    for (var i = 1; i <=5; i++) {
        var date;
        var temp;
        var icon;
        var wind;
        var humidity;

        date = data.daily[i].dt;
        date = moment.unix(date).format("MM/DD/YYYY");

        temp = data.daily[i].temp.day;
        icon = data.daily[i].weather[0].icon;
        wind = data.daily[i].wind_speed;
        humidity = data.daily[i].humidity;

        var card = document.createElement('div');
        card.classList.add('card', 'col-2', 'm-1', 'bg-primary', 'text-white');

        var cardSpace = document.createElement('div');
        cardSpace.classList.add('card-body');
        cardSpace.innerHTML = `<h6>${date}</h6>
            <img src= "http://openweathermap.org/img/wn/${icon}.png"> </><br>
                ${temp}°C<br>
                ${wind} KPH <br>
                ${humidity}%`
                
            card.appendChild(cardSpace);
            fiveDayForecastEl.append(card);
    }

    })
    return;
}

// search history buttons
function searchHistory() {
    var storedCities = JSON.parse(localStorage.getItem("cities")) || [];
    var pastHistory = document.querySelector("#search-history");

    pastHistory.innerHTML = ""; 

    for (i = 0; i < storedCities.length; i++) {
        var cityHistoryBtn = document.createElement("button");
        cityHistoryBtn.classList.add("btn", "btn-primary", "my-2", "past-city");
        cityHistoryBtn.textContent = `${storedCities[i].city}`;
        pastHistory.appendChild(cityHistoryBtn);
    }
    return;
}
//spectial function --event listeners

//logic/start app if required

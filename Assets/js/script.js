//variables

var APIkey = "a680d80e94900005ef907a18f28f496e";
var searchBtn = document.querySelector("#search-button");

//fetch API weather data
function getWeatherdata() {
    var requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${a680d80e94900005ef907a18f28f496e}`
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        storeData(data);
        console.log(data);
        return (data);
})
        return;
};

//store in local storage
// function storeData(data) {
// }

//five day forecast




//add history

//event listener to search button/clear button
searchBtn.addEventListener("click", function(event) {
    cityName = document.querySelector("#city-input").value 
    getWeatherdata();
})


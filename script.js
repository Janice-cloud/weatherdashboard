var cityNameEl = $("#cityName");
var searchBtn = $("#button-addon2");

$(searchBtn).on("click", function(event) {
  event.preventDefault();
  clear();
  var cityName = cityNameEl.val();

    
  var cityNames = JSON.parse(localStorage.getItem("cities"));
  if(cityNames === null){
      cityNames = []
  }

  cityNames.push(cityName)
  
  localStorage.setItem("cities", JSON.stringify(cityNames))

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&units=metric&appid=9db4e6a5ce17b3195b3d176f501370e0";

  console.log(cityName);
  console.log(queryURL);

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    var weatherInfo = $("<div>");
    var cityName = $("<h1>").text(response.name + " ");
    var temperature = $("<h3>").text(
      "Temperature: " + response.main.temp + " Celsius"
    );
    var humidity = $("<h3>").text("Humidity: " + response.main.humidity + "%");

    var unix = response.dt;
    var convdataTime = "";
    var uvIndex;

    var lat = response.coord.lat;
    var lon = response.coord.lon;

    var queryURLtwo =
      "http://api.openweathermap.org/data/2.5/uvi?appid=9db4e6a5ce17b3195b3d176f501370e0&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: queryURLtwo,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
        console.log(lon);
        console.log(lat);

        uvIndex = response.value;

        console.log(uvIndex);
      })
      .then(function() {
        function convert() {
          var months_arr = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ];
          var date = new Date(unix * 1000);
          var year = date.getFullYear();
          var month = months_arr[date.getMonth()];
          var day = date.getDate();

          convdataTime = " (" + day + "/" + month + "/" + year + ") ";

          console.log(convdataTime);
        }
        convert();

        var uvindexInfo = $("<h3>").text("UV Index: " + uvIndex);

        cityName.append(convdataTime);
        weatherInfo.append(cityName);
        weatherInfo.append(temperature);
        weatherInfo.append(humidity);
        weatherInfo.append(uvindexInfo);
        $("#information").prepend(weatherInfo);

        console.log(response.name);
        console.log("Temperature: " + response.main.temp + " Celsius");
        console.log("Humidity: " + response.main.humidity + "%");
      });
  });
});

// create the clear function button
function clear() {
    $("#information").empty();
}


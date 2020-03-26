var cityNameEl = $("#cityName");
var searchBtn = $("#button-addon2");

$(searchBtn).on('click', function(event) {
    event.preventDefault();
    var cityName = cityNameEl.val();


    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=9db4e6a5ce17b3195b3d176f501370e0";

    console.log(cityName)
    console.log(queryURL)
   
    

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            console.log(response);
        
            var weatherInfo = $("<div>");
            var cityName = $("<h1>").text(response.name + " ");
            var temperature = $("<h3>").text("Temperature: " + response.main.temp + " Celsius");
            var humidity = $("<h3>").text("Humidity: " + response.main.humidity + "%");

            var unix = response.dt;
            var convdataTime = "";
            
            function convert() {
                var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
                var date = new Date(unix*1000);
                var year = date.getFullYear();
                var month = months_arr[date.getMonth()]; 
                var day = date.getDate();

                convdataTime = " (" + day + "/" + month + "/" + year + ") "; 

                console.log(convdataTime);

            }
            convert()

            var lat = response.coord.lon;
            var lon = response.coord.lat;

            var queryURL2 = "http://api.openweathermap.org/data/2.5/uvi?appid=9db4e6a5ce17b3195b3d176f501370e0&lat=" + lat + "&lon=" + lon;
    
            $.ajax({
                url: queryURL2,
                method: "GET"
                }).then(function(response) {
                    console.log(response);
                    console.log(lon);
                    console.log(lat);

                    var uvIndex = response.value;
                                    
                    console.log(uvIndex);

                    var uvindexInfo = "UV Index: " + uvIndex;
                    
                    $("#uvindex").prepend(uvindexInfo);
            });

        
        

            console.log(date)
            cityName.append(convdataTime)
            weatherInfo.append(cityName);
            weatherInfo.append(temperature);
            weatherInfo.append(humidity);
            $("#information").prepend(weatherInfo);
            

            console.log(response.name);
            console.log("Temperature: " + response.main.temp + " Celsius" );
            console.log("Humidity: " + response.main.humidity + "%");

    });

    


});
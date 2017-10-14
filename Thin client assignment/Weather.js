


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//        START OF JAVASCRIPT FOR WEATHER
//
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$(function () {
  
    var isMetric = false;
    var locationUrl = "";
    var currentConditionsUrl = "";
    // Visit http://apidev.accuweather.com/developers/languages for a list of supported languages
    var language = "en";
    // Contact AccuWeather to get an official key. They key in this
    // example is temporary and should NOT be used it in production.
    var apiKey = "ad93b6adcb10837c169ef0b4d6d8cc0d";
    //var apiKey = "hoArfRosT1215";
    var apiKeyConditions = "RrreJXv4iZHTPuuyV5IKariXfzF2XgLo";




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    var awxClearMessages = function ()
     {
        $("#awxLocationInfo").html("...");
        $("#awxLocationUrl").html("...");
        $("#awxWeatherInfo").html("...");
        $("#awxWeatherUrl").html("...");
    }


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // SELECT DUBLIN ON PAGE LOAD
    $(document).ready(function ()
     {
        awxCityLookUp("Dublin");
    });


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var awxCityLookUp = function (freeText) 
    {
        awxClearMessages();
        locationUrl = "http://apidev.accuweather.com/locations/v1/search?q=" + freeText + "&apikey=" + apiKey;
        $.ajax({
            type: "GET",
            url: locationUrl,
            dataType: "jsonp",
            cache: true,                    
            success: function (data) { awxCityLookUpFound(data); }
        });
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    // FIND AND DISPLAY LOCATIONS
    var awxCityLookUpFound = function (data)
     {
        var msg, locationKey = null;
        $("#awxLocationUrl").html("<a href=" + encodeURI(locationUrl) + ">" + locationUrl + "</a>");
        if (data.length == 1) {
            locationKey = data[0].Key;
            msg = "One location found: <b>" + data[0].LocalizedName + "</b>. Key: " + locationKey;
        }
        else if (data.length == 0) {
            msg = "No locations found."
        }
        else {
            locationKey = data[0].Key;
            msg = "<b>" + data[0].LocalizedName + ", " + data[0].Country.ID;
        }
        
        $("#awxLocationInfo").html(msg);
        if (locationKey != null) {
            awxGetCurrentConditions(locationKey);
        }

    };


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////




    // GETS CURRENT LOCATION CONDITIONS
    var awxGetCurrentConditions = function (locationKey) 
    {
        var icon = "";
      
        currentConditionsUrl = "http://dataservice.accuweather.com/forecasts/v1/daily/5day/" +
            locationKey + ".json?language=" + language + "&apikey=" + apiKeyConditions + "&metric=true";
        $.ajax({
            type: "GET",
            url: currentConditionsUrl,
            dataType: "jsonp",
            cache: true,                    
            jsonpCallback: "awxCallback",   
            success: function (data) {
                var html;
                var conditions = data.DailyForecasts;
                // JASON OBJECT HOLDING WEATHER INFO FOR NEXT THREE DAYS
                var day1 = conditions[0];
                var day2 = conditions[1];
                var day3 = conditions[2];


                // CREATE ARRAY OF WEEK DAYS TO DISPLAY DAY OF WEEK
                var d = new Date();
                var weekday = new Array(7);
                weekday[0] = "Sunday";
                weekday[1] = "Monday";
                weekday[2] = "Tuesday";
                weekday[3] = "Wednesday";
                weekday[4] = "Thursday";
                weekday[5] = "Friday";
                weekday[6] = "Saturday";

                var Day1 = weekday[d.getDay()];
                var Day2 = weekday[d.getDay() + 1];
                var Day3 = weekday[d.getDay() + 2];

                // PRINT DAY IN APPROPRIATE ID IN HTML FILE
                $("#Day1").html("Today");
                $("#Day2").html( Day2);
                $("#Day3").html( Day3);
                var DateDay1 = day1.Date.substring(0, day1.Date.lastIndexOf('T'));
                var DateDay2 = day2.Date.substring(0, day2.Date.lastIndexOf('T'));
                var DateDay3 = day3.Date.substring(0, day3.Date.lastIndexOf('T'));
                $("#DateDay1").html("Date: " + DateDay1);
                $("#DateDay2").html("Date: " + DateDay2);
                $("#DateDay3").html("Date: " + DateDay3);


                // DAILY TEMPERATURE
                var InfoDay1 = "Temperature: Minimum: " + day1.Temperature.Minimum.Value + "&deg;C, Maximum: " + day1.Temperature.Maximum.Value + "&deg;C<br>Conditions: " + day1.Day.IconPhrase;
                var InfoDay2 = "Temperature: Minimum: " + day2.Temperature.Minimum.Value + "&deg;C, Maximum: " + day2.Temperature.Maximum.Value + "&deg;C<br>Conditions: " + day2.Day.IconPhrase;
                var InfoDay3 = "Temperature: Minimum: " + day3.Temperature.Minimum.Value + "&deg;C, Maximum: " + day3.Temperature.Maximum.Value + "&deg;C<br>Conditions: " + day3.Day.IconPhrase;
                $("#InfoDay1").html(InfoDay1);
                $("#InfoDay2").html(InfoDay2);
                $("#InfoDay3").html(InfoDay3);

                // ASSIGN APPROPRIATE ICON TO DAILY WEATHER
                var IconDay1 = day1.Day.Icon;
                var IconDay2 = day2.Day.Icon;
                var IconDay3 = day3.Day.Icon;
                $("#IconDay1").attr("src", "WeatherIcons/" + IconDay1 + ".png");
                $("#IconDay2").attr("src", "WeatherIcons/" + IconDay2 + ".png");
                $("#IconDay3").attr("src", "WeatherIcons/" + IconDay3 + ".png");


                $("#awxWeatherUrl").html("<a href=" + currentConditionsUrl + ">" + currentConditionsUrl + "</a>");
            }
        });
    };



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    //Change weather Locayion based on selected radio button
    $(function ()
     {
        $("input[name=Location]").change(function (e) {
            var location = (this.value);
            awxCityLookUp(location);
        });
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#awxSearchTextBox").keypress(function (e)
     {
        if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
            var text = $("#awxSearchTextBox").val();
            awxCityLookUp(text);
            return false;
        } else {
            return true;
        }
    });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $("#awxSearchButton").click(function () {
        var text = $("#awxSearchTextBox").val();
        awxCityLookUp(text);
    });

});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



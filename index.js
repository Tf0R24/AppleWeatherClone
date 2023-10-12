window.addEventListener('load', function () {
    geoSetup();

    // Fill Data Function
    function runApi(weather) {

        const currentWeather = JSON.parse(JSON.stringify(weather.days[0]));



        // SIDEBAR DATA

        const sidebarTime = document.getElementsByClassName("sidebarTime")[0];
        sidebarTime.innerHTML = getTime();;

        const sidebarTemp = document.getElementsByClassName("sidebarTemp")[0];
        sidebarTemp.innerHTML = cleanTemp(currentWeather.temp) + "°";

        const sidebarConditions = document.getElementsByClassName("sidebarConditions")[0];
        sidebarConditions.innerHTML = cleanCondition(currentWeather.conditions);

        const sidebarHighLow = document.getElementsByClassName("sidebarHighLow")[0];
        sidebarHighLow.innerHTML = "H:" + cleanTemp(currentWeather.tempmax) + "° L:" + cleanTemp(currentWeather.tempmin + "°");

        // TOP CONTENT DATA

        const topLocation = document.getElementsByClassName("topLocation")[0];
        topLocation.innerHTML = weather.location;

        const topTemp = document.getElementsByClassName("topTemp")[0];
        topTemp.innerHTML = cleanTemp(currentWeather.temp) + "°";

        const topConditions = document.getElementsByClassName("topConditions")[0];
        topConditions.innerHTML = currentWeather.conditions;

        const topHighLow = document.getElementsByClassName("topHighLow")[0];
        topHighLow.innerHTML = "H:" + cleanTemp(currentWeather.tempmin) + "° L:" + cleanTemp(currentWeather.tempmax) + "°";


        // LEFT 4

        const uvIndex = document.getElementsByClassName("uvIndex")[0];
        uvIndex.innerHTML = currentWeather.uvindex;

        const feelsLike = document.getElementsByClassName("feelsLike")[0];
        feelsLike.innerHTML = cleanTemp(currentWeather.feelslike);

        const sunset = document.getElementsByClassName("sunset")[0];
        sunset.innerHTML = cleanTime(currentWeather.sunset);

        const humidity = document.getElementsByClassName("humidity")[0];
        humidity.innerHTML = currentWeather.humidity + "%";

        // RIGHT 4

        const wind = document.getElementsByClassName("wind")[0];
        wind.innerHTML = currentWeather.windspeed + "mph";

        const visibility = document.getElementsByClassName("visibility")[0];
        visibility.innerHTML = currentWeather.visibility + "mi";

        const Precipitation = document.getElementsByClassName("precipitation")[0];
        Precipitation.innerHTML = currentWeather.precip + "mm";

        const pressure = document.getElementsByClassName("pressure")[0];
        pressure.innerHTML = currentWeather.pressure + "hPa";

        console.log(currentWeather);

        hourly(currentWeather);
    }

    // HOURLY SETUP

    async function hourly(weather){
        for (let x = 0; x < weather.hours.length; x++){
            console.log(weather.hours[x]);
        }
    }

    // GEOLOCATION SETUP

    async function geoSetup(){
        //check if geolocation is 
        const successCallback = (position) => {
            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;
            let latlong = latitude + "%2C" + longitude;
            apiSetup(latlong);
        };
        const errorCallback = (error) => {
            console.log(error);
        };
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    }

    // API SETUP
    async function apiSetup(URLString){
        console.log("Ive been waiting!");
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${URLString}?unitGroup=uk&key=7NXFV8AJEAKU3BYMBQESNEHU8&contentType=json&elements=%2Baqieur`,
            {
                method: 'GET',
                headers: {}
            }
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        runApi(data);
    }

    // TIME SETUP
    function getTime(){
        var today = new Date();
        if (today.getMinutes().length == 1){
            const minutes = "0" + today.getMinutes();
        }
        else{
            minutes = today.getMinutes();
        }
        var time = today.getHours() + ":" + minutes;
        return time;
    }

    function cleanTime(time){
        return time.substring(0, 5);
    }

    function cleanCondition(inputString) {
        const commaIndex = inputString.indexOf(',');

        // If a comma is found, remove everything after it
        if (commaIndex !== -1) {
            return inputString.substring(0, commaIndex);
        }
      
        // If no comma is found, return the original string
        return inputString;
    }

    function cleanTemp(inputString) {
        const temp = '' + inputString;
        const dotIndex = temp.indexOf('.');

        // If a comma is found, remove everything after it
        if (dotIndex !== -1) {
            return temp.substring(0, dotIndex);
        }
      
        // If no comma is found, return the original string
        return temp;
    }
})